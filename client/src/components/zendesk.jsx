import React from "react";
import GlobalLayout from "../core/global";
import { useNavigate } from "react-router-dom";
import GuidePage from "./ui/GuidePage";

export default function Zendesk({ onLogout }) {
  const navigate = useNavigate();
  return (
    <GlobalLayout onLogout={onLogout}>
      <GuidePage
        title="ZENDESK/SCRIBE GUIDE"
        description="Fill out the Zendesk guide for ID assist questions."
        step={4}
        total={4}
        guideUrl="https://scribehow.com/viewer/Helpline_to_ID_Tutorial_Updated_42525__HR9I79GfTj-4cB6bwsozgA"
        guideIframeTitle="Zendesk Guide for ID Assist"
        onFilled={() => navigate('/finish')}
        onHelp={() => navigate('/support')}
        onBack={() => navigate('/agree')}
      />
    </GlobalLayout>
  );
}
