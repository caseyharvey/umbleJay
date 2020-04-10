import React from "react";
import Inputs from "./Inputs";
import { styleList } from "../resources/styleList";
import { formatWords, formatVowel, formatOnes } from "../resources/formats";
import "./App.scss";

class App extends React.Component {
  state = {
    result: `Welcome to umbleJay, the best pig latin converter in the cosmos. Enter some text, select a style and umbleJay. When random is selected you can continue to hit umbleJay for some crazy combinations`,
  };

  onTextSubmit = (text, style) => {
    let last = "";
    const random = () => {
      let randomStyle = styleList[Math.floor(Math.random() * styleList.length)];
      if (randomStyle === last) {
        return random();
      }
      last = randomStyle;
      return randomStyle;
    };

    //THIS HANDLES THE STRANGE WUNS
    const styleOnes = (word) => {
      if (word === "once") {
        return "unceW" + (style !== "random" ? style : random());
      }
      return (
        word.replace(/^one/, "un") +
        "W" +
        (style !== "random" ? style : random())
      );
    };

    const applyStyle = (word) => {
      let preStyle = word.split("");
      // WORDS ARE EVALUATED AND REARRANGED
      if (preStyle[0] === "y") {
        // WORD STARTS WITH A 'Y'
        return (
          preStyle.slice(1).join("") +
          "Y" +
          (style !== "random" ? style : random())
        );
        //
      } else if (formatVowel.test(preStyle[0])) {
        // WORD STARTS WITH A VOWEL
        return (
          preStyle.join("") + "Y" + (style !== "random" ? style : random())
        );
        //
      } else if (
        !formatVowel.test(preStyle[0]) &&
        formatVowel.test(preStyle[1])
      ) {
        // WORD STARTS WITH A CONSONANT
        return (
          preStyle.slice(1).join("") +
          preStyle[0].toUpperCase() +
          (style !== "random" ? style : random())
        );
        //
      } else if (
        !formatVowel.test(preStyle[(0, 1)]) &&
        formatVowel.test(preStyle[2])
      ) {
        // WORD STARTS WITH A DIGRAPH
        return (
          preStyle.slice(2).join("") +
          preStyle[0].toUpperCase() +
          preStyle[1] +
          (style !== "random" ? style : random())
        );
      } else {
        // WORD STARTS WITH A TRIGRAPH
        return (
          preStyle.slice(3).join("") +
          preStyle[0].toUpperCase() +
          preStyle[1] +
          preStyle[2] +
          (style !== "random" ? style : random())
        );
      }
    };
    // TEXT IS FORMATTED AND SPLIT INTO AN ARRAY
    const styledArrOfWords = text
      .toLowerCase()
      .trim()
      .replace(/\s\s+/g, " ")
      .replace(/[^a-zA-Z ]/g, "")
      .split(" ")
      .map((word) => {
        if (formatOnes.test(word)) {
          return styleOnes(word);
        } else if (!formatWords.test(word)) {
          return applyStyle(word);
        } else {
          return word;
        }
      });

    this.setState({
      result: styledArrOfWords.join(" "),
    });
  };

  render() {
    return (
      <div className="container">
        <div className="header">
          <div className="logo">umbleJay</div>
        </div>
        <Inputs onSubmit={this.onTextSubmit} />
        <div className="results">{this.state.result}</div>
      </div>
    );
  }
}

export default App;
