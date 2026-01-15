import { useState, useEffect } from "react";
import { Search, ChevronDown, RotateCcw, X, Maximize2, Minimize2, ListFilter, Info, FileText, IdCard, ClipboardList, ShieldCheck, ArrowLeft, FileQuestion, ExternalLink } from "lucide-react";

interface ResearchBasedProps {
  context?: 'helpline' | 'resources';
  onBack?: () => void;
  onContinue?: () => void;
}

const faqs = [
  {
    "question": "Unknown State / Question",
    "answer": "How can we help?\n\nIf you let me know which state you live in, I can look up the information for you. Or you can check your state's website here: usa.gov/election-office. Voter ID requirements by state are here: voteriders.org/staterules/.",
    "tags": ["state information", "voting requirements", "voter questions"],
    "category": "General Information"
  },
  {
    "question": "Do we help voters with IDs and documents needed to get IDs (like Birth Certificates) even if they can vote with other documents in their state?",
    "answer": "We work with voters on a case-by-case basis and will assist with IDs and the documents they may need to get an ID in all states that have photo ID laws, including their Social Security information and other supporting documents if needed for federal elections.  \n\n See_Voter_ID_Assistance_Policies(https://drive.google.com/file/d/1XDUVkOCHFMVT31Jbxiu-ipfFauEvNVVD/view?usp=drivesdk) for guidance.",
    "tags": ["voter ID", "ID documents", "photo ID laws", "assistance"],
    "category": "ID & Documents"
  },
  {
    "question": "Financial help covering fees",
    "answer": "If an eligible voter needs help with fees to get an ID, birth certificate, name change document, etc., get their information for the VoteRiders staff. We can connect with them to help. But don’t promise anything. We don’t cover all fees (like fines). You can tell them we will get back to them.",
    "tags": ["fees", "financial assistance", "ID costs"],
    "category": "ID & Documents"
  },
  {
    "question": "Ride to get an ID (DMV, Social Security office, etc.)",
    "answer": "If someone needs transportation to get an ID (like the DMV, Social Security office, etc.), get their information to escalate their case to ID Assist. We provide free transportation to and from ID-issuing offices for eligible voters.",
    "tags": ["rides", "ID offices", "transportation assistance"],
    "category": "ID & Documents"
  },
  {
    "question": "Ride to the polls",
    "answer": "VoteRiders does not provide rides to the polls for insurance reasons. We share information about free or discounted local resources if we have them, and recommend contacting local groups in a voter’s area (like the League of Women Voters and NAACP, among others). Beyond that, we cannot recommend one party over another, but local political parties or candidate headquarters often provide rides.\n\nMany rideshare platforms (like Lyft and Uber) and cities offer free transit rides on Election Day. If you let me know what city and state you live in, there might be a resource for you I can check on.\n\nWhile VoteRiders does not provide rides to the polls for the general public, we do offer this service to voters whom we’ve previously assisted in getting their ID. If one of these former clients reaches out, please flag for staff in Slack so we can provide proper assistance.",
    "tags": ["rides", "election day", "poll access"],
    "category": "Voting Methods and Process"
  },
  {
    "question": "Volunteer to drive",
    "answer": "For insurance reasons, VoteRiders doesn't have volunteers driving voters to the polls, DMV, or ID-issuing offices. Instead, we usually help to arrange transportation via Lyft or another method to ID issuing offices like the DMV, Social Security office, etc for those voters who need an ID. There are organizations at the local level that help provide rides to the polls (see above under “Ride to the Polls”).",
    "tags": ["volunteers", "rides", "driving restrictions"],
    "category": "General Information"
  },
  {
    "question": "Other volunteer needs",
    "answer": "VoteRiders needs volunteers to help call, text, respond to voter questions, and meet voters in person to help them with registration, IDs, and general voting questions. We also need help with data entry and research. Interested volunteers can sign up here: voteriders.org/volunteer.",
    "tags": ["volunteers", "outreach", "support needs"],
    "category": "General Information"
  },
  {
    "question": "Language access issues / other languages",
    "answer": "For Spanish-speaking voters, please change the ticket’s assignee to “Support/Volunteer_Es” and flag the case in Slack. \n\nFor other languages where information is received in writing, use Google_Translate(translate.google.com) to try and respond if feasible. If a voter needs more direct assistance, get their information for the VoteRiders staff. We can try to connect with them through one of our team members or partners.\n\nThe voter may also be able to receive further assistance in a language other than English or Spanish, they may be able to contact by calling and/or texting the Election Protection Coalition Hotline: 866-OUR-VOTE (866-687-8683) for English, 866-VE-Y-VOTA (866-839-8689) for Spanish, 888-API-VOTE (888-274-8689) for Asian languages, 866OurVote.org.",
    "tags": ["language assistance", "translation", "multilingual support"],
    "category": "General Information"
  },
  {
    "question": "Do I need my voter (registration) card? / lost / replacement",
    "answer": "Some voters and states refer to voter registration cards as Voter ID cards. This is not the same as Voter ID. For more information on the difference, review this VoteRiders article: https://www.voteriders.org/voter-id-cards/\n\nYou can look up your voter registration information through your state’s website (and print a screenshot if you want, or take a screenshot and save it to your phone). If you can’t locate your information in the online database or you do want a physical registration copy sent, you can contact your County Election Office: https://voteriders.turbovote.org/contact-election-office\n\nMost states only send voter registration cards out when you first register or if you update your registration with a new address. And most states do not require you to have it with you to vote as long as your registration is current/active (with any address updates, for example) and you have the right ID with you. You can check your state’s ID requirements to vote here: voteriders.org/staterules/",
    "tags": ["voter registration card", "replacement", "ID requirements"],
    "category": "ID & Documents"
  },
  {
    "question": "How do I register? / How do I know if I'm registered? / How can I check / update / change my registration?",
    "answer": "Voters can check whether they are registered and whether their registration is up to date (address, name, status) here: VoteRiders.org/Vote \n\nOr contact county election offices here: usa.gov/election-office\n\nEvery state requires voters must first register to vote before they cast a ballot. The only state that does not require voter registration is North Dakota. For more information visit https://www.voteriders.org/states/north-dakota/\n\nBe sure to check the registration requirements for your state at https://www.voteriders.org/staterules/ \n\nThe VoteRiders website has a page for first-time voters here: voteriders.org/firstvote/",
    "tags": ["voter registration", "registration status", "registration updates"],
    "category": "Registration"
  },
  {
    "question": "My ID expired",
    "answer": "In many states, you can still use an expired ID to vote. You can get more info on exactly which IDs are accepted by each state at voteriders.org/staterules.",
    "tags": ["expired ID", "voter ID", "state laws"],
    "category": "ID & Documents"
  },
  {
    "question": "Different / new / old address on ID",
    "answer": "A small number of  states require the address on your ID to match the address on your voter registration. But most don’t and only use the ID to confirm identity rather than address. Even if your state does not require that the address on your ID match the address on your registration, if your ID address is out of date , it is a good idea to bring any additional documents you may have, like a bill or bank statement with your name and new address. \n\nIf you have moved you must update your voter registration address.",
    "tags": ["address change", "voter ID", "proof of address"],
    "category": "ID & Documents"
  },
  {
    "question": "How do I find my voter PIN? What's my ID number? What is the state ID number / code?",
    "answer": "Usually that is your state driver's license number, non-driving state ID number, or the last four digits of your Social Security number. However, some states assign each voter a unique number at the time that they register to vote. You should be able to find it by looking up your voter registration information through your state’s website. If you can’t locate their registration information online, then you should contact your County Election Office. https://voteriders.turbovote.org/contact-election-office\n\nTexas Voter Unique Identifier (VUID) can be found on your voter registration certificate which you should be able to find online: teamrv-mvp.sos.texas.gov/MVP/mvp.do",
    "tags": ["voter ID number", "state ID", "voter registration info"],
    "category": "ID & Documents"
  },
  {
      "question": "Do I need a REAL / Star ID to vote?",
      "answer": "No state currently requires a REAL / Star ID to vote. You can read more here: voteriders.org/realid/\n\nHowever, many states now only issue REAL / Star IDs, so if  you need to renew or obtain a state photo ID or driver's license in one of those states you will need to meet the REAL ID documentation requirements. \n\nRequirements to get a REAL / Star ID vary by state. Here is a minimum document list: dhs.gov/real-id/real-id-faqs",
      "tags": ["REAL ID", "Star ID", "voting", "requirements"],
      "category": "ID & Documents"
    },
    {
      "question": "My ID is 'Not for Federal Identification' / What does that mean?",
      "answer": "If your driver’s license or state ID shows “Not for Federal Identification”, it is still valid for voting. It just means that it is not a REAL / Star ID, which is now typically required for boarding planes or entering federal buildings. You can read more here: voteriders.org/realid/",
      "tags": ["ID", "Federal Identification", "REAL ID"],
      "category": "ID & Documents"
    },
    {
      "question": "How do I change my name on my ID?",
      "answer": "The process for how to change your name and update your ID varies by state. Information on specific state rules about name changes on birth certificates and IDs is available here: voteriders.org/pride.  \n\nVoteRiders can assist with name changes on a case-by-case basis. See Voter_ID_Assistance_Policies(https://drive.google.com/file/d/1XDUVkOCHFMVT31Jbxiu-ipfFauEvNVVD/view) for guidance.  \n\nSome states allow voters to use an ID with a name that is not an “exact match” (e.g. “Alex” vs “Alexandra”) so be sure to check the rules for your state:https://www.voteriders.org/staterules/",
      "tags": ["Name Change", "ID", "State Rules"],
      "category": "ID & Documents"
    },
    {
      "question": "Change gender marker on ID",
      "answer": "The process to change the gender marker on identification varies by state. Information on specific state rules is available here: voteriders.org/pride. \n\nVoteRiders can assist with gender marker changes on a case-by-case basis.\n\nA growing list of states no longer allow voters to update the gender marker on their state-issued ID. For voters in those states, we can help them apply for a US passport card with their correct gender marker.  See Voter_ID_Assistance_Policies(https://drive.google.com/file/d/1XDUVkOCHFMVT31Jbxiu-ipfFauEvNVVD/view) for guidance.",
      "tags": ["Gender Marker", "ID", "State Rules"],
      "category": "ID & Documents"
    },
    {
      "question": "What is the last day to register / request / apply to vote by mail / send in my ballot? / Deadlines / When does early voting start?",
      "answer": "https://voteriders.turbovote.org/",
      "tags": ["Deadlines", "Early Voting", "Mail Ballot"],
      "category": "Voting Methods and Process"
    },
    {
      "question": "Where is my polling place / ballot box drop off / voting center?",
      "answer": "Voting dates/times and location options are on your state or county election website. \nhttps://voteriders.turbovote.org/where-to-vote",
      "tags": ["Polling Place", "Voting Center", "Ballot Drop Off"],
      "category": "Voting Methods and Process"
    },
    {
      "question": "When are absentee / vote by mail ballots mailed out? / I didn’t receive it",
      "answer": "Many states now have ballot tracking websites where you can track the status of your ballot and confirm whether it has been mailed to you/received by election officials.\n\nIf you didn’t receive your ballot yet (and you are registered and requested it if necessary), you should contact your county election office. https://voteriders.turbovote.org/contact-election-office",
      "tags": ["Absentee Ballot", "Mail Ballot", "Ballot Tracking"],
      "category": "Voting Methods and Process"
    },
    {
      "question": "I lost / made a mistake on my ballot",
      "answer": "If you lost, damaged, or made a mistake with your mail-in ballot, you need to contact your county election office. Depending on timing, they might be able to send a new vote-by-mail ballot, but you may have to go in person.  https://voteriders.turbovote.org/contact-election-office",
      "tags": ["Lost Ballot", "Mail Ballot", "Replacement Ballot"],
      "category": "Voting Methods and Process"
    },
    {
      "question": "Can I vote in person instead of by mail / absentee?",
      "answer": "If you requested or received a mail/absentee ballot but would prefer to vote in person whether you can do so will depend on the state you live in. Contact your election official: https://voteriders.turbovote.org/contact-election-office\n\nIf you still have your vote-by-mail ballot and you choose to instead vote in person, bring your mail ballot with you to the polls to “surrender” it. Some states may require you to vote by provisional ballot if you don’t have your mail ballot with you so that election officials can verify that you have not voted twice. This is why it’s better to bring your old ballot to the voting site so it can be destroyed.",
      "tags": ["In-Person Voting", "Mail Ballot", "Absentee Voting"],
      "category": "Voting Methods and Process"
    },
    {
      "question": "What is a provisional ballot?",
      "answer": "A provisional ballot is used when there are questions about a voter's eligibility that must be resolved before their vote can count. Voters should always be given a provisional ballot rather than being turned away from the polls.\n\nIn some states where ID is required, a voter who did not provide an accepted ID might be asked to vote a provisional ballot and then have their identity confirmed another way (e.g. by signature match) or to return and provide an accepted ID after Election Day in order to have their ballot counted. Other examples of when a provisional ballot may be used include when a voter has moved, their name doesn’t appear on the registration list, they may be voting in the wrong polling location or if officials must verify the voter did not vote twice (e.g. by mail AND in person if they were issued a mail ballot but decided to vote in person instead).\n\nAfter the election, election officials will review each provisional ballot to determine if the voter was eligible to vote and either count or reject the ballot.",
      "tags": ["Provisional Ballot", "Eligibility", "Voting Process"],
      "category": "Voting Methods and Process"
    },
    {
      "question": "Issues at the polling place / I was turned away / I wasn’t allowed to vote",
      "answer": "If someone is turned away at their polling place and not allowed to vote, they should have been at least told why and offered a provisional ballot.\n\nIf a voter believes they were turned away at the polls for an ID-specific reason, make sure to get their information to escalate with the VoteRiders staff via slack. Request their city, county, state, and precinct information if known. \n\nThey should also escalate (if they feel comfortable and safe doing so) to the poll official and their county election office to report the problem. https://voteriders.turbovote.org/contact-election-office\n\n If they were not offered a provisional ballot by the poll worker, they should return and request one.\n\nMost states with ID laws provide a period of time after Election Day (generally only a couple of days) when voters can return with an accepted ID to ensure that their provisional ballot is counted. Our staff can try to assist voters who did not have an accepted ID at the polls to get an ID in time to “cure” their provisional ballot so that their ballot can still be counted.\n\nFor any other non-ID related polling place issue, like a poll worker misapplying the law or a voter who believes they registered before the deadline but did not appear on the roll at the polling location, the voter should call or text the Election Protection Coalition: 866-OUR-VOTE (866-687-8683) for English, 866-VE-Y-VOTA (866-839-8689) for Spanish, 888-API-VOTE (888-274-8683) for Asian languages, 866OurVote.org. They should also escalate (if they feel comfortable and safe doing so) to the poll official and their county election office to report the problem. https://voteriders.turbovote.org/contact-election-office",
      "tags": ["Polling Issues", "Turned Away", "Provisional Ballot"],
      "category": "Voting Methods and Process"
    },
    {
      "question": "Can a former / ex felon / returning citizen vote?",
      "answer": "This varies from state to state. Many states restore voting rights to individuals after they exit jail or prison, but others continue to bar citizens from voting even while on probation or parole. Some states permanently disenfranchise people with a past conviction or require that they petition the government to have their rights restored. Other states do not remove the right to vote even while incarcerated.\n\nEven in states where returning citizens automatically have their voting rights restored after completing their sentence or probation, you must re-register to vote.\n\nNote that most people in local jails have not yet been convicted and thus retain the right to vote. \n\nYou can check the rules on restoration of voting rights by state here:\nhttps://campaignlegal.org/restoreyourvote\nOR\nnonprofitvote.org/voting-in-your-state/special-circumstances/voting-as-an-ex-offender",
      "tags": ["voting rights", "returning citizens", "state laws"],
      "category": "Rights & Special Circumstances"
    },
    {
      "question": "How can I check what my signature looks like? / my signature has changed",
      "answer": "If you aren’t sure how you signed your name when you registered, what your signature on file looks like, or if your signature has changed, you can check with your county election office and, if needed, submit a new signature. Most states will have you re-register or send in a new registration form by mail (or in-person) in order to do this. \n\nHere are the states that permit voters to correct signature discrepancies:\nhttps://www.ncsl.org/elections-and-campaigns/table-15-states-with-signature-cure-processes\n\nCounty election official contact information: https://voteriders.turbovote.org/contact-election-office",
      "tags": ["signatures", "voter registration"],
      "category": "Rights & Special Circumstances"
    },
    {
      "question": "How is my signature verified? How do they verify id if I vote absentee / by mail?",
      "answer": "Here is information about how states verify absentee/vote by mail ballots:\nhttps://www.ncsl.org/elections-and-campaigns/table-14-how-states-verify-voted-absentee-mail-ballots\nIf the voter has further questions, please flag for VoteRiders staff in Slack.",
      "tags": ["signatures", "absentee ballots", "mail ballots"],
      "category": "Voting Methods and Process"
    },
    {
      "question": "How do I track / confirm my ballot is counted?",
      "answer": "Many states have online tracking, like BallotTrax.com, either through state websites or county websites. Otherwise, the only way to check is by contacting your county election office. https://voteriders.turbovote.org/contact-election-office",
      "tags": ["ballot tracking", "elections"],
      "category": "Voting Methods and Process"
    },
    {
      "question": "My ballot wasn’t counted / was rejected / why?",
      "answer": "Each state has different rules for mail ballots. Check your state’s rules here: https://www.voteriders.org/staterules/\n\nSome of the reasons a ballot may be rejected are:\n• If it was postmarked or received after the deadline\n• If it wasn’t signed\n• If it wasn’t dated\n• If a witness signature was required but not included\n• If the voter’s signature on the ballot didn’t match the voter’s signature on file\n• In some states, like Pennsylvania, there is a second, inner envelope (called a “secrecy envelope”) that the ballot must be placed in before being put in the outer envelope to mail\n• If there is an incomplete affidavit\n• A required copy of an accpeted ID or ID information (e.g. driver’s license/state ID number) was not included\n• If the voter was not registered at all or registered after the deadline",
      "tags": ["ballot rejection", "mail ballots"],
      "category": "Voting Methods and Process"
    },
    {
      "question": "What can I do if my mail ballot wasn’t counted? What is ballot curing? / how do I cure my ballot?",
      "answer": "If there is an error with a mail-in ballot, such as a missing signature or a signature that does not match the one on record, most (but not all) states give the voter an opportunity to fix it or “cure” their ballot, depending on the issue. \n\nThis process is known as “curing” the ballot, and the period of time to do this varies by state. \n\nCuring a problem with an absentee ballot is different from when a voter who votes in person does not have an accepted ID and is given a provisional ballot and an opportunity to “cure” their ID provisional ballot. This ID process is also referred to as “curing” a ballot.\nA voter who votes provisionally because they did not provide ID is then given a period of time (usually only a couple of days) to provide to election officials an accepted ID to ensure their ballot is counted.",
      "tags": ["ballot curing", "mail ballots", "provisional ballots"],
      "category": "Voting Methods and Process"
    },
    {
      "question": "What about fraud? Are there advocacy groups that support / fight voter id laws?",
      "answer": "If a voter has questions along these lines, please flag for staff in Slack.",
      "tags": ["fraud", "voter ID laws"],
      "category": "Rights & Special Circumstances"
    },
    {
      "question": "Who / what is on the ballot? / sample ballot",
      "answer": "It is best to contact your local election office for information on upcoming elections and to request a sample ballot. https://voteriders.turbovote.org/contact-election-office  \n\nhttps://voteriders.turbovote.org/whats-on-your-ballot/voter-info and vote411.org are also good resources to learn about what’s on the ballot in your state.",
      "tags": ["sample ballot", "elections"],
      "category": "Voting Methods and Process"
    },
    {
      "question": "Media or press requests",
      "answer": "We only speak with media or the press to get their contact information to forward to our Communications team. If you handle a call or text that is from the media, please collect their contact information and flag it in Slack for VoteRiders staff.",
      "tags": ["media", "press"],
      "category": "General Information"
    },
    {
      "question": "Other non-voting related",
      "answer": "For partner, donor, or volunteer inquiries, get their information for a VoteRiders staff member for follow-up. Please flag in Slack.",
      "tags": ["non-voting", "partners", "volunteers"],
      "category": "General Information"
    },
    {
      "question": "Overseas",
      "answer": "If you are a US citizen temporarily or permanently abroad and need information about how to access your absentee ballot, you should first contact your local election official https://voteriders.turbovote.org/contact-election-office  \n\nIf you have specific questions or issues we recommend contacting the Overseas Vote Foundation: overseasvotefoundation.org/vote/home.htm\nOr the Federal Voting Assistance Program, fvap.gov\n\nOverseas voters can also receive help by calling and/or texting the Election Protection Coalition Hotline: 866-OUR-VOTE (866-687-8683) for English, 866-VE-Y-VOTA (866-839-8689) for Spanish, 888-API-VOTE (888-274-8683) for Asian languages, 866OurVote.org. \n\nGenerally, overseas voters are exempt from voter ID requirements, but check the specific rules for each state here: https://www.voteriders.org/staterules",
      "tags": ["overseas voters", "absentee ballots"],
      "category": "Rights & Special Circumstances"
    },
    {
      "question": "Wrong country / non citizen",
      "answer": "I'm sorry, we only provide voter ID services to US citizens.",
      "tags": ["non-citizens", "voter ID"],
      "category": "Rights & Special Circumstances"
    },
    {
      "question": "What is the difference between an absentee ballot and a mail ballot?",
      "answer": "States differ in how they refer to ballots that are cast by mail. Some states call these absentee ballots, some states call them mail ballots. Some states also refer to ballots that are cast in person prior to election day during early voting as absentee ballots. Some states also have both absentee ballots and mail ballots and use the terms to refer to whether a qualifying excuse is required to vote early or by mail.\n\nCheck the specific state’s rules on how to refer to ballots in your state: https://www.voteriders.org/staterules",
      "tags": ["absentee ballots", "mail ballots"],
      "category": "Voting Methods and Process"
    },
    {
      "question": "How do I get a new social security card without an id?",
      "answer": "If you are getting a replacement card, you might be able to apply for it online here: ssa.gov/ssnumber/\nOtherwise, you can complete an application and submit the required supporting documents to bring to a Social Security office or mail everything in.\n\nThe Social Security Administration’s definitive list of documents is here: secure.ssa.gov/apps10/poms.nsf/lnx/0110210420 (scroll down to “Documents For An Adult Age 18 Or Older”)\nA doctor-certified record can be submitted as identification as an alternative to a health insurance (except for Medicare) card that is not current and/or doesn’t include the individual’s name plus date of birth or age; an alternative to DOB or age would be a photograph.",
      "tags": ["social security", "identification"],
      "category": "ID & Documents"
    },
    {
      "question": "I moved. Where do I vote? Do I need to update my address?",
      "answer": "Whether and how a voter should update their address on their voter registration varies by state and timing. \n\nStates require you to update your voter registration when you move or change your name. However,  the rules about whether and how you can still vote if you have not updated your registration vary by state. Please contact your local election official to get accurate information for your specific situation.\n\nSome states offer Same Day Registration, which allows you to register and vote at the same time. This also allows voters who are already registered but need to update their registration to make changes to their registration at the time that they vote. Info on whether a state offers SDR is available on our state pages https://www.voteriders.org/staterules/\nOther states will still allow you to vote if you moved close in time to Election Day, but it will vary by state whether you need to vote in your old precinct or your new precinct. Usually, if a voter only moves across town, or within the same congressional district, but did not update their voter registration, that person can still vote. However, they will likely have to go to their former polling location or a central voting site and vote in person. \n\nSome states may require a voter who moved to vote a provisional ballot as a way to update their voter registration address.\nVoters who move to a different state within 30 days of the election might find that the state they just moved to has a registration deadline or residency requirement that prevents them from registering and voting there.\nVoters who move states within 30 days of an election can contact their former state's elections office to request a special ballot that will allow them to at least vote in the presidential race.\nSee the FAQ below “DIFFERENT / NEW / OLD ADDRESS ON ID” for what to do if a voter has moved and has not updated their ID address",
      "tags": ["voter registration", "address changes"],
      "category": "Registration"
    }
];

const categoryOptions = [
  { value: "all", label: "All Topics", Icon: ListFilter },
  { value: "General Information", label: "General Information", Icon: Info },
  { value: "Registration", label: "Registration", Icon: FileText },
  { value: "ID & Documents", label: "ID & Documents", Icon: IdCard },
  { value: "Voting Methods and Process", label: "Voting Methods and Process", Icon: ClipboardList },
  { value: "Rights & Special Circumstances", label: "Rights & Special Circumstances", Icon: ShieldCheck },
];

export function ResearchBased({ context, onBack, onContinue }: ResearchBasedProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedQuestion, setSelectedQuestion] = useState<number | null>(null);

  const selectedOption = categoryOptions.find(o => o.value === selectedCategory);

  const filteredFAQs = faqs
    .filter(faq => 
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .filter(faq => selectedCategory === "all" || faq.category === selectedCategory);

  useEffect(() => {
    if (selectedQuestion != null && (selectedQuestion < 0 || selectedQuestion >= filteredFAQs.length)) {
      setSelectedQuestion(null);
    }
  }, [selectedQuestion, filteredFAQs.length]);

  const linkifyText = (text: string) => {
    const combined = /([^\s()]+)\s*\(((?:https?:\/\/|www\.)?[^\s()]*\.(?:com|gov|org)[^\s()]*)\)|((?:https?:\/\/|www\.)?[^\s()]*\.(?:com|gov|org)[^\s()]*)/gi;
    const nodes: (string | JSX.Element)[] = [];
    let lastIndex = 0;
    let match;

    while ((match = combined.exec(text)) !== null) {
      const full = match[0];
      const start = match.index;
      if (start > lastIndex) nodes.push(text.slice(lastIndex, start));

      if (match[1] && match[2]) {
        const label = match[1];
        const urlInParens = match[2];
        const href = /^https?:\/\//i.test(urlInParens)
          ? urlInParens
          : urlInParens.startsWith('www.')
            ? `https://${urlInParens}`
            : `https://${urlInParens}`;

        nodes.push(
          <a
            key={`${start}-label-${href}`}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:opacity-80 break-words"
            style={{ color: '#4A90E2' }}
          >
            {label}
          </a>
        );
      } else if (match[3]) {
        let token = match[3];
        const trailingMatch = token.match(/[.,;:!?]+$/);
        const trailing = trailingMatch ? trailingMatch[0] : '';
        const clean = trailing ? token.slice(0, token.length - trailing.length) : token;
        const href = /^https?:\/\//i.test(clean)
          ? clean
          : clean.startsWith('www.')
            ? `https://${clean}`
            : `https://${clean}`;

        nodes.push(
          <a
            key={`${start}-url-${clean}`}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:opacity-80 break-words"
            style={{ color: '#4A90E2' }}
          >
            {clean}
          </a>
        );
        if (trailing) nodes.push(trailing);
      }

      lastIndex = start + full.length;
    }

    if (lastIndex < text.length) nodes.push(text.slice(lastIndex));
    return nodes;
  };

  const renderAnswer = (text: string) => (
    <span className="break-words whitespace-pre-line">{linkifyText(text)}</span>
  );

  return (
    <main className="flex-1 overflow-auto">
      <div className="max-w-4xl mx-auto px-8 py-12">
        {/* Back Button - only show in helpline context */}
        {context === 'helpline' && onBack && (
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft className="size-4" />
            <span>Back to Step 1</span>
          </button>
        )}

        {/* Page Header */}
        {context === 'helpline' ? (
          <div className="mb-8 flex items-center gap-4">
            <div
              className="rounded-2xl p-4"
              style={{ backgroundColor: '#8B5CF6' }}
            >
              <FileQuestion className="size-6 text-white" />
            </div>
            <div>
              <h1 className="mb-1">Helpline: Step 2 - Research-Based Questions</h1>
              <p className="text-muted-foreground">
                Quick answers to common voter ID and registration questions
              </p>
            </div>
          </div>
        ) : (
          <div className="mb-8">
            <h1 className="mb-2">Resources: Research-Based Questions</h1>
            <p className="text-muted-foreground">
              Quick answers to common voter ID and registration questions
            </p>
          </div>
        )}

        {/* Resource Links */}
        <div className="mb-6 flex flex-wrap gap-3">
          <a
            href="https://docs.google.com/document/d/1wKgPdH1n680K9bv9X9ZD4X48Ln7VnOxC-gFLeucqFb4/edit?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-3 bg-card border-2 border-border rounded-xl hover:bg-muted hover:border-primary/40 transition-all group"
          >
            <div 
              className="size-8 rounded-lg flex items-center justify-center text-white"
              style={{ backgroundColor: '#4A90E2' }}
            >
              <FileText className="size-4" />
            </div>
            <span className="group-hover:text-primary transition-colors">FAQ Documentation</span>
            <ExternalLink className="size-4 text-muted-foreground group-hover:text-primary transition-colors" />
          </a>
          
          <a
            href="https://www.voteriders.org/staterules/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-3 bg-card border-2 border-border rounded-xl hover:bg-muted hover:border-primary/40 transition-all group"
          >
            <div 
              className="size-8 rounded-lg flex items-center justify-center text-white"
              style={{ backgroundColor: '#F59E0B' }}
            >
              <ClipboardList className="size-4" />
            </div>
            <span className="group-hover:text-primary transition-colors">State Rules Reference</span>
            <ExternalLink className="size-4 text-muted-foreground group-hover:text-primary transition-colors" />
          </a>
        </div>

        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 size-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by question, keyword, or topic..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-card border-2 border-border rounded-xl placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all"
            style={{ 
              borderColor: searchTerm ? '#1AC166' : undefined,
              boxShadow: searchTerm ? '0 0 0 4px rgba(26, 193, 102, 0.1)' : undefined,
            }}
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 p-1 hover:bg-muted rounded-md transition-colors"
            >
              <X className="size-4 text-muted-foreground" />
            </button>
          )}
        </div>

        {/* Category Tabs */}
        <div className="mb-6 flex flex-wrap gap-2">
          {categoryOptions.map(({ value, label, Icon }) => {
            const isActive = selectedCategory === value;
            return (
              <button
                key={value}
                onClick={() => setSelectedCategory(value)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border transition-all ${
                  isActive 
                    ? 'text-white border-transparent shadow-md' 
                    : 'bg-card border-border hover:bg-muted hover:border-border'
                }`}
                style={{
                  backgroundColor: isActive ? '#1AC166' : undefined,
                }}
              >
                <Icon className="size-4" />
                <span className="text-sm">{label}</span>
                {value !== 'all' && isActive && (
                  <span className="ml-1 px-1.5 py-0.5 bg-white/20 rounded-full text-xs">
                    {faqs.filter(f => f.category === value).length}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Results Count */}
        {(searchTerm || selectedCategory !== 'all') && (
          <div className="mb-4 flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Showing {filteredFAQs.length} of {faqs.length} {filteredFAQs.length === 1 ? 'question' : 'questions'}
              {searchTerm && ` matching "${searchTerm}"`}
            </div>
            {(searchTerm || selectedCategory !== 'all') && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                }}
                className="flex items-center gap-1 text-sm px-3 py-1.5 rounded-lg border border-border hover:bg-muted transition-colors"
              >
                <RotateCcw className="size-3.5" />
                Clear All Filters
              </button>
            )}
          </div>
        )}

        {/* FAQ Grid */}
        {filteredFAQs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredFAQs.map((item, index) => {
              const categoryOption = categoryOptions.find(c => c.category === item.category);
              const CategoryIcon = categoryOption?.Icon || Info;
              
              return (
                <div
                  key={index}
                  onClick={() => setSelectedQuestion(index)}
                  className="group cursor-pointer bg-card border border-border rounded-xl p-5 hover:shadow-lg transition-all hover:border-primary/30"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div 
                      className="size-10 rounded-xl flex items-center justify-center flex-shrink-0 text-white"
                      style={{ backgroundColor: '#1AC166' }}
                    >
                      <CategoryIcon className="size-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="mb-1 leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                        {item.question}
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        {item.category}
                      </p>
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground leading-relaxed mb-3 line-clamp-2">
                    {item.answer}
                  </p>
                  
                  <div className="flex flex-wrap gap-1.5">
                    {item.tags.slice(0, 3).map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="text-xs px-2 py-0.5 rounded-full border"
                        style={{
                          backgroundColor: '#8B5CF6' + '15',
                          borderColor: '#8B5CF6' + '30',
                          color: '#8B5CF6',
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                    {item.tags.length > 3 && (
                      <span className="text-xs px-2 py-0.5 text-muted-foreground">
                        +{item.tags.length - 3} more
                      </span>
                    )}
                  </div>
                  
                  <div className="mt-3 pt-3 border-t border-border flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Click to view full answer</span>
                    <Maximize2 className="size-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-card border border-border rounded-xl p-12 text-center">
            <Search className="size-16 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h3 className="mb-2">No questions found</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm 
                ? `No results for "${searchTerm}". Try different keywords.`
                : "Try selecting a different category or adjusting your search."}
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
              }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border hover:bg-muted transition-colors"
            >
              <RotateCcw className="size-4" />
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Continue Button - only show in helpline context */}
      {context === 'helpline' && onContinue && (
        <div className="fixed bottom-8 right-8 z-50">
          <button
            onClick={onContinue}
            className="px-6 py-3 rounded-lg text-white transition-all hover:shadow-lg hover:scale-[1.02] shadow-xl"
            style={{ backgroundColor: '#8B5CF6' }}
          >
            Continue to Zendesk Guide
          </button>
        </div>
      )}

      {/* Pop-out overlay */}
      {selectedQuestion != null && filteredFAQs[selectedQuestion] && (
        <div
          className="fixed inset-0 z-[999] bg-black/50 backdrop-blur-sm"
          onClick={() => setSelectedQuestion(null)}
        >
          <div className="absolute top-24 left-1/2 -translate-x-1/2 w-[92vw] max-w-4xl">
            <div
              className="relative bg-card border border-border rounded-2xl shadow-2xl p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setSelectedQuestion(null)}
                aria-label="Close"
                className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted"
              >
                <X className="size-5" />
              </button>

              <div className="flex items-start gap-4 pr-12">
                <div 
                  className="size-12 rounded-full flex items-center justify-center flex-shrink-0 mt-1 text-white"
                  style={{ backgroundColor: '#1AC166' }}
                >
                  <span className="text-lg">{selectedQuestion + 1}</span>
                </div>
                <div className="flex-1">
                  <h2 className="mb-4 leading-relaxed">
                    {filteredFAQs[selectedQuestion].question}
                  </h2>
                  <p className="text-lg leading-relaxed mb-6 text-muted-foreground">
                    {renderAnswer(filteredFAQs[selectedQuestion].answer)}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {filteredFAQs[selectedQuestion].tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="text-sm px-3 py-1 rounded-full border"
                        style={{
                          backgroundColor: '#8B5CF6' + '20',
                          borderColor: '#8B5CF6' + '40',
                          color: '#8B5CF6',
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Category: {filteredFAQs[selectedQuestion].category}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}