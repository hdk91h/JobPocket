import React from "react";

const About: React.FC = () => {
  return (
    <div>
      <div className="grid grid-cols-1 mt-5">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-3xl">About</h1>
          <p className="text-xl p-2 max-w-[70%]">
            JobPocket ist eine React-PWA für die Verwaltung von Bewerbungen.{" "}
            <br /> Die Web-App kann heruntergeladen und offline verwendet
            werden. Es werden keinerlei Daten getrackt.
          </p>
          <p>
            Zu finden auf GitHub:{" "}
            <a className="text-yellow-600 hover:underline" href="#">
              JobPocket Repository
            </a>
          </p>
          <p>
            Erstellt von{" "}
            <a
              className="text-violet-500 hover:underline"
              href="https://haustein.in"
            >
              Hendrik Haustein
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
