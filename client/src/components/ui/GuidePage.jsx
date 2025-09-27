import React from 'react';
import ProgressBar from './ProgressBar';
import FlowButton from './FlowButton';
import BackButton from './BackButton';
import GuideEmbed from './GuideEmbed';
import { Check, AlertCircle } from 'lucide-react';

export default function GuidePage({
  title,
  description,
  step = 1,
  total = 1,
  guideUrl,
  guideIframeTitle,
  filledLabel = 'Filled Out',
  helpLabel = 'Need Help',
  onFilled,
  onHelp,
  onBack,
  // layout customization
  topPadding = 'pt-20 lg:pt-28'
}) {
  return (
    <main className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${topPadding} py-4`}>
      <div className="text-center">
        {title && <h1 className="text-5xl font-bold text-white mb-8">{title}</h1>}
        {description && <p className="text-xl text-white mb-8 text-center">{description}</p>}
        <ProgressBar step={step} total={total} />
        <GuideEmbed
          url={guideUrl}
          iframeTitle={guideIframeTitle || title}
          className="mb-10"
        />
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8">
          {onFilled && (
            <FlowButton color="green" icon={Check} onClick={onFilled}>{filledLabel}</FlowButton>
          )}
          {onHelp && (
            <FlowButton color="red" icon={AlertCircle} onClick={onHelp}>{helpLabel}</FlowButton>
          )}
        </div>
        {onBack && <BackButton onClick={onBack} />}
      </div>
    </main>
  );
}
