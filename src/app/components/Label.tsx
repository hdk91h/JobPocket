import { FC } from "react";
import {
  faPaperPlane,
  faCheckCircle,
  faTimesCircle,
  faUser,
  faClipboardCheck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface LabelProps {
  isMobile: boolean;
  children: React.ReactNode;
}

const Label: FC<LabelProps> = ({ isMobile, children }) => {
  const statusIcons = {
    sent: faPaperPlane,
    open: faUser,
    interview: faUser,
    offer: faCheckCircle,
    rejected: faTimesCircle,
    accepted: faCheckCircle,
    canceled: faTimesCircle,
    screening: faClipboardCheck,
  };

  if (isMobile) {
    switch (children) {
      case "sent":
        return (
          <div className="flex items-center justify-center gap-2 px-4 py-2 rounded-full label bg-blue-200 text-blue-700">
            <FontAwesomeIcon icon={statusIcons.sent} />
            <span className="label-text"> Gesendet</span>
          </div>
        );
      case "open":
        return (
          <div className="flex items-center justify-center gap-2 px-4 py-2 rounded-full label bg-gray-200 text-gray-700">
            <FontAwesomeIcon icon={statusIcons.open} />
            <span className="label-text"> Offen</span>
          </div>
        );
      case "interview":
        return (
          <div className="flex items-center justify-center gap-2 px-4 py-2 rounded-full label bg-yellow-200 text-yellow-700">
            <FontAwesomeIcon icon={statusIcons.interview} />
            <span className="label-text"> Vorstellungsgespräch</span>
          </div>
        );
      case "offer":
        return (
          <div className="flex items-center justify-center gap-2 px-4 py-2 rounded-full label bg-green-200 text-green-700">
            <FontAwesomeIcon icon={statusIcons.offer} />
            <span className="label-text"> Angebot</span>
          </div>
        );
      case "rejected":
        return (
          <div className="flex items-center justify-center gap-2 px-4 py-2 rounded-full label bg-red-200 text-red-700">
            <FontAwesomeIcon icon={statusIcons.rejected} />
            <span className="label-text"> Abgelehnt</span>
          </div>
        );
      case "accepted":
        return (
          <div className="flex items-center justify-center gap-2 px-4 py-2 rounded-full label bg-green-200 text-green-700">
            <FontAwesomeIcon icon={statusIcons.accepted} />
            <span className="label-text"> Zusage</span>
          </div>
        );
      case "canceled":
        return (
          <div className="flex items-center justify-center gap-2 px-4 py-2 rounded-full label bg-red-200 text-red-700">
            <FontAwesomeIcon icon={statusIcons.canceled} />
            <span className="label-text"> Abgebrochen</span>
          </div>
        );
      case "screening":
        return (
          <div className="flex items-center justify-center gap-2 px-4 py-2 rounded-full label bg-indigo-200 text-indigo-700">
            <FontAwesomeIcon icon={statusIcons.screening} />
            <span className="label-text"> In Bearbeitung</span>
          </div>
        );
    }
  } else {
    switch (children) {
      case "sent":
        return (
          <div className="flex items-center justify-center gap-2 px-4 py-2 rounded-full label bg-blue-200 text-blue-700">
            <FontAwesomeIcon icon={statusIcons.sent} />
            <span className="label-text"> Gesendet</span>
          </div>
        );
      case "open":
        return (
          <div className="flex items-center justify-center gap-2 px-4 py-2 rounded-full label bg-gray-200 text-gray-700">
            <FontAwesomeIcon icon={statusIcons.open} />
            <span className="label-text"> Offen</span>
          </div>
        );
      case "interview":
        return (
          <div className="flex items-center justify-center gap-2 px-4 py-2 rounded-full label bg-yellow-200 text-yellow-700">
            <FontAwesomeIcon icon={statusIcons.interview} />
            <span className="label-text"> Vorstellungsgespräch</span>
          </div>
        );
      case "offer":
        return (
          <div className="flex items-center justify-center gap-2 px-4 py-2 rounded-full label bg-green-200 text-green-700">
            <FontAwesomeIcon icon={statusIcons.offer} />
            <span className="label-text"> Angebot</span>
          </div>
        );
      case "rejected":
        return (
          <div className="flex items-center justify-center gap-2 px-4 py-2 rounded-full label bg-red-200 text-red-700">
            <FontAwesomeIcon icon={statusIcons.rejected} />
            <span className="label-text"> Abgelehnt</span>
          </div>
        );
      case "accepted":
        return (
          <div className="flex items-center justify-center gap-2 px-4 py-2 rounded-full label bg-green-200 text-green-700">
            <FontAwesomeIcon icon={statusIcons.accepted} />
            <span className="label-text"> Zusage</span>
          </div>
        );
      case "canceled":
        return (
          <div className="flex items-center justify-center gap-2 px-4 py-2 rounded-full label bg-red-200 text-red-700">
            <FontAwesomeIcon icon={statusIcons.canceled} />
            <span className="label-text"> Abgebrochen</span>
          </div>
        );
      case "screening":
        return (
          <div className="flex items-center justify-center gap-2 px-4 py-2 rounded-full label bg-indigo-200 text-indigo-700">
            <FontAwesomeIcon icon={statusIcons.screening} />
            <span className="label-text"> In Bearbeitung</span>
          </div>
        );
    }
  }

  return (
    <div className="flex items-center justify-center gap-2 px-4 py-2 rounded-full label">
      <span className="label-text">{children}</span>
    </div>
  );
};

export default Label;
