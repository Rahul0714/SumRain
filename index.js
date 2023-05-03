#!/usr/bin/env node

import fetch from "node-fetch";
import yargs from "yargs";
import inquirer from "inquirer";

const { argv } = yargs(process.argv);
console.log(process.argv);

const nextFiveHoursTemp = async (lat, long) => {
  const response = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&hourly=temperature_2m`
  );
  const tempValues = await response.json();
  console.log(tempValues["hourly"]["time"].slice(0, 26));
  console.log(tempValues["hourly"]["temperature_2m"].slice(0, 25));
};

const prompt = inquirer.createPromptModule();
prompt([
  {
    type: "input",
    name: "lat",
    message: "Enter lattitude of your location",
  },
  {
    type: "input",
    name: "long",
    message: "Enter longitude of your location",
  },
]).then((ans) => {
  const lat = ans.lat;
  const long = ans.long;
  nextFiveHoursTemp(lat, long);
});
