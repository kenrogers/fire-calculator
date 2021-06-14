import { useState, ReactElement } from "react";
import Head from "next/head";
import CurrencyInput from "react-currency-input-field";

import Button from "../components/Button";

export default function Home():ReactElement {
  const [goalBudget, setGoalBudget] = useState<number>(5000);
  const [currentAge, setCurrentAge] = useState<number>(25);
  const [goalAge, setGoalAge] = useState<number>(40);
  const [currentInvestment, setCurrentInvestment] = useState<number>(10000);
  const [targetInvestment, setTargetInvestment] = useState<number>(0);
  const [targetContribution, setTargetContribution] = useState<number>(0);

  const formSubmit = function (event) {
    event.preventDefault();
    setTargetInvestment(goalBudget * 12 * 25);

    // Number of years person will be contributing
    const contributions = (goalAge - currentAge) * 12;
    setTargetContribution(
      Math.floor(
        // .009... is the monthly version of an 11% annual interest rate
        pmt(
          0.00916667,
          contributions,
          currentInvestment,
          goalBudget * 12 * 25,
          0
        )
      )
    );
  };

  const pmt = function (ir, np, pv, fv, type) {
    // From https://stackoverflow.com/questions/5294074/pmt-function-in-javascript

    /*
     * ir   - interest rate per month
     * np   - number of periods (months)
     * pv   - present value
     * fv   - future value
     * type - when the payments are due:
     *        0: end of the period, e.g. end of month (default)
     *        1: beginning of period
     */
    var pmt, pvif;

    fv || (fv = 0);
    type || (type = 0);

    if (ir === 0) return -(pv + fv) / np;

    pvif = Math.pow(1 + ir, np);
    pmt = (ir * (pv * pvif + fv)) / (pvif - 1);

    if (type === 1) pmt /= 1 + ir;

    return pmt;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-900">
      <Head>
        <title>FIRE Calculator</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="preload"
          href="/fonts/MonumentExtended-Regular.otf"
          as="font"
          crossOrigin=""
        />
        <link
          rel="preload"
          href="/fonts/MonumentExtended-Ultrabold.otf"
          as="font"
          crossOrigin=""
        />
        <link
          rel="preload"
          href="/fonts/GeneralSans-Regular.otf"
          as="font"
          crossOrigin=""
        />
        <link
          rel="preload"
          href="/fonts/GeneralSans-Bold.otf"
          as="font"
          crossOrigin=""
        />
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center text-white font-general mt-10">
        <h1 className="text-8xl font-extrabold font-monument tracking-wider">
          SimpleFIRE
        </h1>
        <div className="w-1/2 mt-8">
          <h2 className="text-4xl">
            The world's simplest financial independence calculator
          </h2>
          <p className="mt-8 text-xl">
            This calculator helps you set a goal for achieving financial
            independence by following the advice of JL Collins in
            <em>
              <a
                className="text-pink-500"
                href="https://www.amazon.com/Simple-Path-Wealth-financial-independence/dp/1533667926"
              >
                The Simple Path to Wealth
              </a>
            </em>
            .
          </p>
        </div>
        <form className="w-1/3 mt-8" onSubmit={formSubmit}>
          <div className="space-y-4">
            <div className="items-center justify-between flex">
              <label
                htmlFor="income"
                className="block mb-2 xs:w-2/5 md:w-1/2 xs:mr-2 xs:mb-0 text-left"
              >
                Desired monthly budget
              </label>
              <div className="w-full xs:w-3/5 md:w-1/2">
                <div className="flex items-center w-full rounded-lg bg-black focus-within:ring-2 focus-within:ring-teal">
                  <span className="block pl-3 pr-2 text-gray">$</span>
                  <CurrencyInput
                    id="income"
                    type="text"
                    inputMode="numeric"
                    className="w-full h-10 pr-3 text-white bg-transparent border-0 appearance-none tabular-nums focus:ring-0 focus:outline-none"
                    defaultValue={goalBudget}
                    decimalsLimit={2}
                    onValueChange={(value) => setGoalBudget(parseInt(value))}
                  />
                </div>
              </div>
            </div>
            <div className="items-center justify-between flex">
              <label
                htmlFor="income"
                className="block mb-2 xs:w-2/5 md:w-1/2 xs:mr-2 xs:mb-0 text-left"
              >
                Currently invested
              </label>
              <div className="w-full xs:w-3/5 md:w-1/2">
                <div className="flex items-center w-full rounded-lg bg-black focus-within:ring-2 focus-within:ring-teal">
                  <span className="block pl-3 pr-2 text-gray">$</span>
                  <CurrencyInput
                    id="income"
                    type="text"
                    inputMode="numeric"
                    className="w-full h-10 pr-3 text-white bg-transparent border-0 appearance-none tabular-nums focus:ring-0 focus:outline-none"
                    defaultValue={currentInvestment}
                    decimalsLimit={2}
                    onValueChange={(value) => setCurrentInvestment(parseInt(value))}
                  />
                </div>
              </div>
            </div>
            <div className="items-center justify-between flex">
              <label
                htmlFor="currentAge"
                className="block mb-2 xs:w-2/5 md:w-1/2 xs:mr-2 xs:mb-0 text-left"
              >
                Current age
              </label>
              <div className="w-full xs:w-3/5 md:w-1/2">
                <div className="flex items-center w-full rounded-lg bg-black focus-within:ring-2 focus-within:ring-teal">
                  <input
                    id="currentAge"
                    type="text"
                    inputMode="numeric"
                    className="w-full h-10 px-3 text-white bg-transparent border-0 appearance-none tabular-nums focus:ring-0 focus:outline-none"
                    value={currentAge}
                    onChange={(event) => setCurrentAge(parseInt(event.currentTarget.value))}
                  />
                </div>
              </div>
            </div>
            <div className="items-center justify-between flex">
              <label
                htmlFor="goalAge"
                className="block mb-2 xs:w-2/5 md:w-1/2 xs:mr-2 xs:mb-0 text-left"
              >
                Desired FIRE age
              </label>
              <div className="w-full xs:w-3/5 md:w-1/2">
                <div className="flex items-center w-full rounded-lg bg-black focus-within:ring-2 focus-within:ring-teal">
                  <input
                    id="goalAge"
                    type="text"
                    inputMode="numeric"
                    className="w-full h-10 px-3 text-white bg-transparent border-0 appearance-none tabular-nums focus:ring-0 focus:outline-none"
                    value={goalAge}
                    onChange={(event) => setGoalAge(parseInt(event.currentTarget.value))}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8">
            <Button>Make it happen</Button>
          </div>
        </form>
        {targetInvestment > 0 ? (
          <div className="w-3/4 mb-10">
            <p className="text-3xl mt-8">
              Based on your numbers, you need{" "}
              <span className="font-bold text-pink-500">
                ${Intl.NumberFormat("en-US").format(targetInvestment)}
              </span>{" "}
              in Vanguard's VTSAX fund to retire by the time you are {goalAge}.
            </p>
            <p className="text-3xl mt-8">
              That means you need to save{" "}
              <span className="font-bold text-pink-500">
                ${Intl.NumberFormat("en-US").format(targetContribution)}
              </span>{" "}
              every month until you're {goalAge}.
            </p>
            <p className="text-xl text-gray-300 mt-8">
              This is assuming a return rate of 11%, the average return of
              VTSAX.
            </p>
          </div>
        ) : (
          ""
        )}
      </main>
    </div>
  );
}
