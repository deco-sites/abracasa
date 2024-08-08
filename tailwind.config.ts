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
        "gray-light": "#A5A5A5",
        "gray-normal": "#AEAEAE",
        "gray-dark": "#585858",
        "gray-48": "#7A7A7A",
      },
    },
  },
};
