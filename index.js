"use strict";

const wc = document.getElementById("wc");
const bw = document.getElementById("bw");
const csc = document.getElementById("csc");
const cs = document.getElementById("sc");
const rc = document.getElementById("rc");

const csa = document.getElementById("csa");
const wp = document.getElementById("wp");
const hr = document.getElementById("hr");
const cc = document.getElementById("cc");
const qc = document.getElementById("qc");
const fd = document.getElementById("fd");
const calcButton = document.querySelector(".calc-button");

const formDOM = {
  wc,
  bw,
  csc,
  sc,
  rc,
};

const form = {
  wc: "0",
  bw: "0",
  csc: "0",
  sc: "0",
  rc: "0",
};

const outputDom = {
  csa,
  wp,
  hr,
  cc,
  qc,
  fd,
};

const output = {
  csa: 0,
  wp: 0,
  hr: 0,
  cc: 0,
  qc: 0,
  fd: 0,
};

Object.entries(formDOM).forEach(([key, control]) => {
  control.value = form[key];
  control.addEventListener("input", (event) => {
    form[key] = event.target.value;
    control.value = form[key];
  });
});

calcButton.addEventListener("click", () => {
  Object.entries(form).forEach(([key, value]) => {
    form[key] = +value;
    if (isNaN(form[key])) {
      alert("Is not a number!!!");
      Object.entries(form).forEach(([key, value]) => (form[key] = 0));
      return;
    }
  });
  Object.entries(output).forEach(([key, value]) => {
    output[key] = 0;
  });
  for (; output.qc <= form.wc; output.fd = output.fd + 0.0001) {
    output.csa = (form.bw + form.sc * output.fd) * output.fd;
    output.wp =
      form.bw + 2.0 * output.fd * Math.sqrt(1.0 + Math.pow(form.sc, 2.0));
    output.hr = output.csa / output.wp;
    output.cc = (1 / form.rc) * Math.pow(output.hr, 1.0 / 6.0);
    output.qc = output.csa * output.cc * Math.sqrt(output.hr * form.csc);
  }

  Object.entries(outputDom).forEach(([key, control]) => {
    control.value = output[key];
  });
});
