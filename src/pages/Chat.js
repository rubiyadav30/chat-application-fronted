import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Sidebar from "../components/Sidebar";
import MessageForm from "../components/MessageForm";

function Chat() {
  return (
    <Container>
      <Row className="chat-room-container">
        <Col md={4} className="chat-room-sidebar">
          <Sidebar />
        </Col>
        <Col md={8} className="chat-room-chatbox">
          <MessageForm />
        </Col>
      </Row>
    </Container>
  );
}

export default Chat;
