export default {
  candidates: {
    list: () =>
      new Promise((resolve) => {
        const data = JSON.parse(localStorage.getItem("data") || "[]");

        if (data.length) {
          return resolve(data);
        }

        return import("./candidates.json").then((res) => resolve(res.default));
      }),
    save: async (data) => localStorage.setItem("data", JSON.stringify(data)),
  },
};
