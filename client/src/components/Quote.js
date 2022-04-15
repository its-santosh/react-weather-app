import React from "react";
import * as quotes from "../quotes.json";

const Quote = () => {
  const quoteMessage = quotes[Math.floor(Math.random() * (1650 - 0) + 0)];
  return (
    <div>
      <p className="italic word-break text-justify indent-12 text-2xl font-base text-white text-opacity-90">
        {`"${quoteMessage.text}"`}
      </p>
      <p className="pt-2 text-right text-black">{`- ${
        quoteMessage.author ? quoteMessage.author : "Unknown"
      }`}</p>
    </div>
  );
};
export default Quote;
