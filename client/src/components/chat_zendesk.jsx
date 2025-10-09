import React from "react";
import GlobalLayout from "../core/global";
import { useNavigate } from "react-router-dom";
import GuidePage from "./ui/GuidePage";

export default function ChatZendesk({ onLogout }) {
  const navigate = useNavigate();
  return (
    <GlobalLayout onLogout={onLogout}>
      <GuidePage
        title="ZENDESK/SCRIBE GUIDE"
        description="Fill out the Zendesk guide for research-based questions."
        step={3}
        total={4}
        guideUrl="https://scribehow.com/viewer/Chat_Guide__yupGjKBkRW6IoZ_egps3gQ"
        guideIframeTitle="Chat Zendesk Guide"
        onFilled={() => navigate('/finish')}
        onHelp={() => navigate('/support')}
        onBack={() => navigate('/chat')}
      />
    </GlobalLayout>
  );
}
