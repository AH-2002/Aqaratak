"use client"

import { useState } from "react";
import Footer from "../Footer"
import Navbar from "../Navbar"

export default function Plans() {
    let [MonthlyPlan, SetMonthlyPlanState] = useState(true);
    function MonthlyPlanState() {
        return SetMonthlyPlanState(true)
    }
    function YearlyPlanState() {
        return SetMonthlyPlanState(false)
    }
    const plans = [
        { duration: "1 Week", price: "500,000 ADE" },
        { duration: "2 Weeks", price: "1,000,000 ADE" },
        { duration: "3 Weeks", price: "1,500,000 ADE" },
        { duration: "4 Weeks", price: "1,500,000 ADE" },
        { duration: "2 Weeks", price: "2,000,000 ADE" },
        { duration: "3 Weeks", price: "3,000,000 ADE" }
    ];
    const plans2 = [
        { duration: "1 Year", price: "500,000 ADE" },
        { duration: "2 Years", price: "1,000,000 ADE" },
        { duration: "3 Years", price: "1,500,000 ADE" },
        { duration: "4 Years", price: "1,500,000 ADE" },
        { duration: "5 Years", price: "2,000,000 ADE" },
        { duration: "6 Years", price: "3,000,000 ADE" }
    ];

    return (
        <section className='max-w-8xl mx-auto px-4 sm:px-6 lg:px-8'>
            <Navbar />
            <main style={{ padding: '20px 0' }}>
                <h1 style={{ textAlign: 'center', fontSize: 'larger', fontWeight: 'bolder', margin: '10px 0' }}>
                    Pick your perfect plan
                </h1>
                <div className="flex justify-center mb-6">
                    <div className="bg-gray-200 rounded-full p-1 w-64 flex">
                        <button
                            onClick={MonthlyPlanState}
                            className={`flex-1 py-2 rounded-full font-bold transition ${MonthlyPlan ? "bg-purple-500 text-white" : "text-gray-700"
                                }`}
                        >
                            Monthly
                        </button>
                        <button
                            onClick={YearlyPlanState}
                            className={`flex-1 py-2 rounded-full font-bold transition ${!MonthlyPlan ? "bg-purple-500 text-white" : "text-gray-700"
                                }`}
                        >
                            Yearly
                        </button>
                    </div>
                </div>

                <div className='MonthlyPlan' style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>

                    {(MonthlyPlan ? plans : plans2).map((plan, index) => (
                        <div key={index} style={{ width: "30%", textAlign: 'center', border: '1px solid gray', borderRadius: '10px', padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                            <p style={{ fontWeight: 'bolder' }}>{plan.duration}</p>
                            <p style={{ fontWeight: 'bolder', fontSize: 'larger', margin: '30px 0 20px 0' }}>{plan.price}</p>
                            <button
                                type="button"
                                className="inline-block w-full rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
                                data-twe-ripple-init
                                data-twe-ripple-color="light"
                                style={{ background: 'linear-gradient(to bottom, rgba(75, 2, 75, 0.655), rgba(213, 56, 213, 0.852))', color: 'white', padding: '20px', borderRadius: '10px' }}>
                                Purchase plan
                            </button>
                        </div>
                    ))}

                </div>
            </main>
            <Footer />
        </section>
    )
}
