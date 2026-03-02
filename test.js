const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    res("ok");
  }, 2000);
});

console.log(
  p1.then((res) => {
    console.log(res);
  }),
);
