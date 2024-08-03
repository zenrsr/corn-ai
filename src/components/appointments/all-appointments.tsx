import { APPOINTMENT_TABLE_HEADER } from "@/constants/menu";
import React from "react";
import DataTable from "../data-table";
import { TableCell, TableRow } from "../ui/table";
import { formatHours, formatMinutes, getMonthName } from "@/lib/utils";
import { CardDescription } from "../ui/card";

type Props = {
  bookings:
    | {
        Customer: {
          Domain: {
            name: string;
          } | null;
        } | null;
        id: string;
        email: string;
        domainId: string | null;
        date: Date;
        slot: string;
        createdAt: Date;
      }[]
    | undefined;
};

const AllAppointments = ({ bookings }: Props) => {
  return (
    <DataTable headers={APPOINTMENT_TABLE_HEADER}>
      {bookings ? (
        bookings.map((booking) => (
          <TableRow key={booking.id}>
            <TableCell>{booking.email}</TableCell>
            <TableCell>
              <div>
                {getMonthName(booking.date.getMonth())} {booking.date.getDate()}
                ,{booking.date.getFullYear()}
              </div>
              <div className="uppercase">{booking.slot}</div>
            </TableCell>
            <TableCell>
              <div>
                {getMonthName(booking.createdAt.getMonth())}{" "}
                {booking.createdAt.getDate()} {booking.createdAt.getFullYear()}
              </div>
              <div>
                {formatHours(booking.createdAt.getHours())}:
                {formatMinutes(booking.createdAt.getMinutes())}{" "}
                {booking.createdAt.getHours() >= 12 ? "PM" : "AM"}
              </div>
            </TableCell>
            <TableCell className="text-right">
              {booking.Customer?.Domain?.name}
            </TableCell>
          </TableRow>
        ))
      ) : (
        <CardDescription className="my-4">No Appointments</CardDescription>
      )}
    </DataTable>
  );
};

export default AllAppointments;
