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
      },
    },
  },
};
