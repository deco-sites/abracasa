import daisyui from "daisyui";

export default {
  plugins: [daisyui],
  daisyui: { themes: [], logs: false },
  content: ["./**/*.tsx"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        "firebrick": "#ab0033",
        "dimgray": "#555555",
        "whitesmoke": "#f2f2f2",
        "snow": "#fbfbfb",
        "crimson": "#c9154c",
        "gray-normal": "#AEAEAE",
        "gray-dark": "#585858",
      },
      boxShadow: {
        "inner-custom": "inset 0px 7px 3px -3px rgba(50, 50, 50, 0.1);",
      },
    },
  },
};
