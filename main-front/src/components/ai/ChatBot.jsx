import React, { useState } from "react";
import styled from "@emotion/styled/macro";
import { RiCustomerService2Line } from "react-icons/ri";
import { ClipLoader } from "react-spinners";
import { RiSendPlaneFill } from "react-icons/ri";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isChatVisible, setIsChatVisible] = useState(false); // 채팅창 보이게 하는 상태

  const apiEndpoint = "https://api.openai.com/v1/chat/completions";
  const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
  // const apiKey =
  //   "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"; // API 키는 안전하게 관리 필요

  const addMessage = (sender, content) => {
    setMessages((prev) => [...prev, { sender, content }]);
  };

  const handleSendMessage = async () => {
    const message = userInput.trim();
    if (message.length === 0) return;

    addMessage("user", message);
    setUserInput("");
    setLoading(true);

    try {
      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            ...messages.map((msg) => ({
              role: msg.sender === "user" ? "user" : "assistant",
              content: msg.content,
            })),
            { role: "user", content: message },
          ],
          max_tokens: 50,
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        throw new Error(`API 오류: ${response.status}`);
      }

      const data = await response.json();
      const aiMessage = data.choices[0]?.message?.content || "응답이 없습니다.";
      addMessage("assistant", aiMessage);
    } catch (error) {
      console.error("오류 발생:", error);
      addMessage("assistant", "오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSendMessage();
    }
  };

  const toggleChatVisibility = () => {
    setIsChatVisible((prev) => !prev);
  };

  return (
    <div>
      {/* 버튼을 눌렀을 때 채팅창을 보이게 하기 */}
      <ShowChatButton onClick={toggleChatVisibility}>
        <RiCustomerService2Line />
      </ShowChatButton>

      {isChatVisible && (
        <>
          <Overlay onClick={toggleChatVisibility} />
          <ChatbotContainer>
            <Title>Chat AI</Title>
            <ChatContainer>
              <Message>믿음 중고차 HiCar 채팅 상담 입니다! 무엇이든 물어보세요 !</Message>
              {messages.map((msg, index) => (
                <Message key={index} sender={msg.sender}>
                  <strong>{msg.sender === "user" ? "You" : "Bot"}:</strong> {msg.content}
                </Message>
              ))}
              {loading && (
                <LoadingText>
                  <ClipLoader color="#000" z-index={11} />
                </LoadingText>
              )}
            </ChatContainer>
            <InputContainer>
              <Input
                type="text"
                placeholder="message here"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <SendButton onClick={handleSendMessage} disabled={loading}>
                <RiSendPlaneFill />
              </SendButton>
            </InputContainer>
          </ChatbotContainer>
        </>
      )}
    </div>
  );
};

// Styled components
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

const ChatbotContainer = styled.div`
  position: fixed;
  top: 24%;
  right: 6%;
  width: 90%;
  max-width: 400px;
  height: 60%;
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  z-index: 1000;
  overflow: hidden;
`;

const ShowChatButton = styled.button`
  position: fixed;
  bottom: 30px;
  right: 1%;
  width: 70px;
  height: 70px;
  padding: 10px 20px;
  font-size: 16px;
  background-color: rgba(0, 0, 0, 0.3);
  color: white;
  border: none;
  border-radius: 100%;
  cursor: pointer;
  margin-bottom: 20px;
  transition: 0.3 ease;

  svg {
    font-size: 31px;
  }

  &:hover {
    background-color: rgba(0, 0, 0, 0.5);
  }
`;

const Title = styled.h1`
  font-size: 24px;
  text-align: center;
  margin-bottom: 20px;
  color: #495057;
`;

const ChatContainer = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  margin-bottom: 20px;
  padding-right: 10px;
`;

const Message = styled.div`
  background-color: ${(props) => (props.sender === "user" ? "#007bff" : "#e9ecef")};
  color: ${(props) => (props.sender === "user" ? "#fff" : "#495057")};
  padding: 10px;
  border-radius: 10px;
  margin: 10px 0;
  max-width: 75%;
  word-wrap: break-word;
  align-self: ${(props) => (props.sender === "user" ? "flex-end" : "flex-start")};
  font-size: 16px;
`;

const LoadingText = styled.div`
  text-align: center;
  font-size: 18px;
  color: #6c757d;
`;

const InputContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Input = styled.input`
  width: 80%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 25px;
  outline: none;
  box-sizing: border-box;
  margin-right: 10px;

  &:focus {
    border-color: #007bff;
  }
`;

const SendButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  background-color: rgba(0, 0, 0, 0.3);
  color: white;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  outline: none;

  &:hover {
    background-color: rgba(0, 0, 0, 0.5);
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

export default Chatbot;
