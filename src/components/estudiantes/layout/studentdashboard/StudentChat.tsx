'use client';

import { useEffect, useRef, useState } from 'react';

import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';

import { useUser } from '@clerk/nextjs';
import { BsPersonCircle } from 'react-icons/bs';
import { HiMiniCpuChip } from 'react-icons/hi2';

import {
  getConversationWithMessages,
  getOrCreateConversation,
} from '~/server/actions/estudiantes/chats/saveChat';

// Props for the chat component
interface ChatProps {
  courseId?: number | null;
  courseTitle?: string;
  isEnrolled?: boolean;
  messages: {
    id: number;
    text: string;
    sender: string;
    buttons?: { label: string; action: string }[]; // <- Nuevo campo opcional
  }[];
  setMessages: React.Dispatch<
    React.SetStateAction<{ id: number; text: string; sender: string }[]>
  >;
  chatMode: {
    idChat: number | null;
    status: boolean;
  };
  setChatMode: React.Dispatch<
    React.SetStateAction<{
      idChat: number | null;
      status: boolean;
      curso_title: string;
    }>
  >;
  setShowChatList: React.Dispatch<React.SetStateAction<boolean>>;
  inputText: string;
  setInputText: (text: string) => void;
  handleSendMessage: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
  messagesEndRef: React.RefObject<HTMLDivElement>;
  isSignedIn?: boolean;
  inputRef?: React.RefObject<HTMLInputElement>;
  renderMessage: (
    message: { id: number; text: string; sender: string },
    idx: number
  ) => React.ReactNode;
  idea?: { selected: boolean; idea: string };
  setIdea?: React.Dispatch<
    React.SetStateAction<{ selected: boolean; idea: string }>
  >;
}

export const ChatMessages: React.FC<ChatProps> = ({
  setShowChatList,
  courseId,
  courseTitle,
  isEnrolled,
  messages,
  setMessages,
  chatMode,
  setChatMode,
  inputText,
  setInputText,
  handleSendMessage,
  isLoading,
  messagesEndRef,
  isSignedIn = false,
  inputRef,
  renderMessage = (message, idx) => (
    <div key={idx} className="text-sm">
      {message.text}
    </div>
  ),
}) => {
  const defaultInputRef = useRef<HTMLInputElement>(null);
  const actualInputRef = inputRef ?? defaultInputRef;

  const { user } = useUser();

  const [conversation] = useState<{ id: number }>({
    id: chatMode.idChat ?? courseId ?? 0,
  });
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setShowChatList(false);
  }, [setShowChatList]);

  function handleBotButtonClick(action: string) {
    switch (action) {
      case 'show_toc':
        console.log('Mostrar temario');
        break;
      case 'new_idea':
        window.dispatchEvent(new CustomEvent('new-idea'));
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            id: Date.now(),
            text: '¡Genial! ¿Cuál es tu idea? 📝',
            sender: 'bot',
          },
        ]);
        break;
      case 'contact_support':
        window.dispatchEvent(new CustomEvent('support-open-chat'));
        break;
      case 'new_project':
        // Lógica para crear proyecto
        if (!isSignedIn) {
          // Redirigir a la página de planes
          router.push(`/planes`);
        }
        break;
      default:
        console.log('Acción no reconocida:', action);
    }
  }

  useEffect(() => {
    console.log('La conversación: ' + conversation.id);

    if (!conversation) return;

    // No hacer consulta SQL si es un chat temporal (ID muy grande)
    if (conversation.id && conversation.id > 1000000000000) {
      console.log('Chat temporal detectado, saltando consulta SQL');
      return;
    }

    let inCourse = false;

    if (pathname.includes('cursos') || pathname.includes('curso')) {
      console.log('Ingreso al if');
      if (isEnrolled) {
        console.log('Usuario está inscrito en el curso');
        inCourse = true;
      }
    }

    const fetchMessages = async () => {
      let chats: {
        messages: { id: number; message: string; sender: string }[];
      } = { messages: [] };
      try {
        if (conversation.id !== null && conversation.id < 1000000000000) {
          chats = await getConversationWithMessages(conversation.id);
        } else {
          console.log('ID temporal o null, no ejecutando consulta SQL');
        }

        console.log('Datos: ' + conversation.id + ' ' + conversation.id);
        console.log('Chats:', chats);

        if (chats && chats.messages.length > 0) {
          console.log('Cargando mensajes de la conversación existente');
          // Si ya hay mensajes, los cargamos
          if (inCourse) {
            setChatMode({
              idChat: conversation.id,
              status: true,
              curso_title: courseTitle ?? '',
            });
          }

          const loadedMessages = chats.messages.map(
            (msg: { id: number; message: string; sender: string }) => ({
              id: msg.id,
              text: msg.message,
              sender: msg.sender,
            })
          );

          const botMessage = {
            id: -1,
            text:
              isEnrolled == true
                ? '¡Hola! soy Artie 🤖 tú chatbot para resolver tus dudas, Bienvenid@ al curso ' +
                  courseTitle +
                  ' , Si tienes alguna duda sobre el curso u otra, ¡Puedes hacermela! 😎'
                : '¡Hola! soy Artie 🤖 tú chatbot para resolver tus dudas, ¿En qué puedo ayudarte hoy? 😎',
            sender: 'bot',
            /* DOCUMENTADO POR SI ME PIDE VOLVERLO A PONER
                        buttons: [
                        { label: '📚 Crear Proyecto', action: 'new_project' },
                        { label: '💬 Nueva Idea', action: 'new_idea' },
                        { label: '🛠 Soporte Técnico', action: 'contact_support' },
                         
                        ],
                        */
          };

          const alreadyHasBot = loadedMessages.some(
            (msg) => msg.sender === 'bot' && msg.text === botMessage.text
          );

          setMessages(
            alreadyHasBot ? loadedMessages : [botMessage, ...loadedMessages]
          );
        }
        // Creamos una conversación si no existe, luego de 2 mensajes enviados por el usuario
        else {
          console.log(
            'No hay mensajes en la conversación, creando una nueva conversación'
          );
          if (chats.messages.length === 0) {
            /*
                        const botMessage = {
                            id: -1,
                            text: isEnrolled == true ?  '¡Hola! soy Artie 🤖 tú chatbot para resolver tus dudas, Bienvenid@ al curso ' + courseTitle + ' , Si tienes alguna duda sobre el curso u otra, ¡Puedes hacermela! 😎' : '¡Hola! soy Artie 🤖 tú chatbot para resolver tus dudas, ¿En qué puedo ayudarte hoy? 😎',
                            sender: 'bot'
                        };
                        
                        setMessages([botMessage, ...messages]);
                        */

            if (courseId != null) {
              void getOrCreateConversation({
                senderId: user?.id ?? '',
                cursoId: courseId,
                title:
                  'Curso - ' +
                  (courseTitle
                    ? courseTitle.length > 12
                      ? courseTitle.slice(0, 35) + '...'
                      : courseTitle
                    : 'Sin título'),
              });

              setChatMode({
                idChat: courseId,
                status: true,
                curso_title: '',
              });
            }
          } else {
            console.log('Pero no entra para el if de crear conversación');
          }
        }
      } catch (error) {
        console.error('Error al obtener los mensajes:', error);
      }
    };

    void fetchMessages();
  }, [
    conversation,
    courseId,
    courseTitle,
    isEnrolled,
    pathname,
    setChatMode,
    setMessages,
    user?.id,
  ]);

  return (
    <>
      {/* Messages */}
      <div className="relative z-[3] flex-1 space-y-4 overflow-y-auto p-4">
        {messages.map((message, idx) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender === 'user' ? 'justify-end' : 'justify-start'
            } mb-4`}
          >
            <div
              className={`flex max-w-[80%] items-start space-x-2 ${
                message.sender === 'user'
                  ? 'flex-row-reverse space-x-reverse'
                  : 'flex-row'
              }`}
            >
              {message.sender === 'bot' ? (
                <HiMiniCpuChip className="mt-2 text-3xl text-blue-500" />
              ) : user?.imageUrl ? (
                <Image
                  src={user.imageUrl ?? '/default-avatar.png'}
                  alt={user.fullName ?? 'User'}
                  width={24}
                  height={24}
                  className="mt-2 rounded-full"
                  priority
                />
              ) : (
                <BsPersonCircle className="mt-2 text-xl text-gray-500" />
              )}
              <div
                className={`rounded-lg p-3 ${
                  message.sender === 'user'
                    ? 'bg-secondary text-white'
                    : 'bg-gray-300 text-gray-800'
                }`}
              >
                {renderMessage(message, idx)}
                {/* Renderizar botones si existen */}

                {message.sender === 'bot' && message.buttons && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {message.buttons && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {message.buttons
                          .filter(
                            (btn) =>
                              !(btn.action === 'contact_support' && !isSignedIn)
                          )
                          .map((btn) => (
                            <button
                              key={btn.action}
                              className="rounded bg-cyan-600 px-3 py-1 font-semibold text-white transition hover:bg-cyan-700"
                              onClick={() => handleBotButtonClick(btn.action)}
                              type="button"
                            >
                              {btn.label}
                            </button>
                          ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="rounded-lg bg-gray-100 p-3">
              <div className="loader">
                <div className="circle">
                  <div className="dot" />
                  <div className="outline" />
                </div>
                <div className="circle">
                  <div className="dot" />
                  <div className="outline" />
                </div>
                <div className="circle">
                  <div className="dot" />
                  <div className="outline" />
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="relative z-[5] border-t bg-white/95 p-4 backdrop-blur-sm">
        <form onSubmit={handleSendMessage}>
          <div className="flex gap-2">
            <input
              ref={actualInputRef}
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={'Escribe un mensaje...'}
              className="text-background focus:ring-secondary flex-1 rounded-lg border p-2 focus:ring-2 focus:outline-none"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading}
              className="bg-secondary group relative flex h-10 w-14 items-center justify-center rounded-lg transition-all hover:bg-[#00A5C0] active:scale-90 disabled:bg-gray-300"
            >
              <Image
                src="/send-svgrepo-com.svg"
                alt="Send message"
                width={24}
                height={24}
                className="size-6 transition-all duration-200 group-hover:scale-110 group-hover:rotate-12"
                priority
              />
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
