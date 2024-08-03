import {
  getUserAppointments,
  getUserBalance,
  getUserClients,
  getUserPlanInfo,
  getUserTotalProductPrice,
  getUserTransactions
} from "@/actions/dashboard";
import DasboardCard from "@/components/dashboard/dashboard-card";
import PlanUsage from "@/components/dashboard/plan-usage";
import InfoBar from "@/components/infobar";
import { Separator } from "@/components/ui/separator";
import PersonIcon from "@/icons/person-icon";
import { TransactionsIcon } from "@/icons/transactions-icon";
import {
  Calendar,
  DollarSignIcon,
  User2Icon,
  UsersIcon,
  WalletIcon
} from "lucide-react";
import React from "react";

type Props = {};

const page = async (props: Props) => {
  const clients = await getUserClients();
  const sales = await getUserBalance();
  const bookings = await getUserAppointments();
  const plan = await getUserPlanInfo();
  const transactions = await getUserTransactions();
  const products = await getUserTotalProductPrice();

  // console.log({ clients, sales, bookings, plan, transactions, products });

  return (
    <>
      <InfoBar />
      <div className="flex-1 overflow-y-auto w-full chat-window h-0 p-4">
        <div className="flex gap-5 flex-wrap">
          <DasboardCard
            value={clients || 0}
            title="Potential Clients"
            icon={<UsersIcon />}
          />
          <DasboardCard
            value={products! * clients! || 0}
            title="Pipeline Value"
            icon={<DollarSignIcon />}
          />
          <DasboardCard
            value={bookings || 0}
            title="Appointments"
            icon={<Calendar />}
          />
          <DasboardCard
            value={sales || 0}
            title="Total Sales"
            icon={<DollarSignIcon />}
          />
        </div>
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 py-10 ">
          <div>
            <div>
              <h2 className="font-bold text-2xl">Plan Usage</h2>
              <p className="text-sm font-light">
                A detailed overview of your plan usage, metrics, customers and
                much more.
              </p>
            </div>
            <PlanUsage
              plan={plan?.plan!}
              credits={plan?.credits || 0}
              domains={plan?.domains || 0}
              clients={clients!}
            />
          </div>
          <div className="flex flex-col">
            <div className="w-full flex justify-between items-start mb-5">
              <div className="flex gap-3 items-center">
                <WalletIcon />
                <p className="font-bold">Recent Transactions</p>
              </div>
              <p className="text-sm">See more</p>
            </div>
            <Separator orientation="horizontal" />
            {transactions &&
              transactions.data.map((transaction) => (
                <div
                  className="flex gap-3 w-full justify-between items-center border-b-2 py-5"
                  key={transaction.id}
                >
                  <p className="font-bold">
                    {transaction.calculated_statement_descriptor}
                  </p>
                  <p className="font-bold">${transaction.amount / 100}</p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
