"use client";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { OrgMemberDTO } from "@yoku-app/shared-schemas/dist/types/organisation/dto/member-dto";

import { ChevronDown, MoreHorizontal, Plus, Search } from "lucide-react";
import { useState } from "react";

// This would typically come from an API call
const members: OrgMemberDTO[] = [
    {
        user: {
            id: "5d4fdb29-51c1-41e8-9196-b6c402cfc422",
            name: "Poopy Spidoopy Head",
            dob: new Date("2025-01-08T06:42:51.591084Z"),
            email: "yoku.app.test@gmail.com",
        },
        memberSince: new Date("2025-02-09T19:58:34.383134+11:00"),
        position: {
            id: "49370583-67e3-4fd8-9f1f-a51888aefef5",
            name: "Member",
        },
    },
    {
        user: {
            id: "5d4fdb29-51c1-41e8-9196-b6c402cfc422",
            name: "Poopy Spidoopy Head",
            dob: new Date("2025-01-08T06:42:51.591084Z"),
            email: "yoku.app.test@gmail.com",
        },
        memberSince: new Date("2025-02-09T19:58:34.383134+11:00"),
        position: {
            id: "49370583-67e3-4fd8-9f1f-a51888aefef5",
            name: "Member",
        },
    },
    {
        user: {
            id: "5d4fdb29-51c1-41e8-9196-b6c402cfc422",
            name: "Poopy Spidoopy Head",
            dob: new Date("2025-01-08T06:42:51.591084Z"),
            email: "yoku.app.test@gmail.com",
        },
        memberSince: new Date("2025-02-09T19:58:34.383134+11:00"),
        position: {
            id: "49370583-67e3-4fd8-9f1f-a51888aefef5",
            name: "Member",
        },
    },
];

export default function OrganizationMembers() {
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const filteredMembers = members.filter(
        (member) =>
            member.user?.name
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
            member.user?.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(filteredMembers.length / itemsPerPage);
    const paginatedMembers = filteredMembers.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <div className="container mx-auto py-10">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Organization Members</h1>
                <Button>
                    <Plus className="mr-2 h-4 w-4" /> Invite Member
                </Button>
            </div>

            <div className="flex justify-between items-center mb-4">
                <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search members"
                        className="pl-8"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline">
                            Bulk Actions{" "}
                            <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem>Remove Selected</DropdownMenuItem>
                        <DropdownMenuItem>Change Role</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Joined</TableHead>
                            <TableHead className="text-right">
                                Actions
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {paginatedMembers.map((member) => (
                            <TableRow key={member.user?.id}>
                                <TableCell className="font-medium">
                                    {member.user?.name}
                                </TableCell>
                                <TableCell>{member.user?.name}</TableCell>
                                <TableCell>{member.position.name}</TableCell>

                                <TableCell>
                                    {new Date(
                                        member.memberSince
                                    ).toLocaleDateString()}
                                </TableCell>
                                <TableCell className="text-right">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button
                                                variant="ghost"
                                                className="h-8 w-8 p-0"
                                            >
                                                <span className="sr-only">
                                                    Open menu
                                                </span>
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuLabel>
                                                Actions
                                            </DropdownMenuLabel>
                                            <DropdownMenuItem>
                                                Edit Member
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                Change Role
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem className="text-red-600">
                                                Remove Member
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {totalPages > 1 && (
                <div className="flex justify-center space-x-2 mt-4">
                    <Button
                        variant="outline"
                        onClick={() =>
                            setCurrentPage((prev) => Math.max(prev - 1, 1))
                        }
                        disabled={currentPage === 1}
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        onClick={() =>
                            setCurrentPage((prev) =>
                                Math.min(prev + 1, totalPages)
                            )
                        }
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </Button>
                </div>
            )}
        </div>
    );
}
