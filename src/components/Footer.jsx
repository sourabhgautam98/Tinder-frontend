import React from "react";

export default function Footer() {
  return (
    <footer className="footer bg-neutral text-neutral-content p-4 fixed bottom-0 left-0 w-full z-50 flex justify-center">
      <p className="text-center">
        Copyright © {new Date().getFullYear()} - All rights reserved
      </p>
    </footer>
  );
}
