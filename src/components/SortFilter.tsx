import React, { useState } from "react";
import  useTaskContext  from "../context/TaskContext";
import { ListFilter } from "lucide-react";
import SortSvg from "../../public/icon/sort-4.svg";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const SortFilterOptions: React.FC = () => {
  const { sortTask, filterTasks } = useTaskContext();
  const [currentPriority, setCurrentPriority] = useState<string | undefined>(undefined);
const [currentStatus, setCurrentStatus] = useState<string | undefined>(undefined);

const handleFilter = (filterType: string, value: string) => {
  if (filterType === 'priority') {
    setCurrentPriority(value);
    filterTasks(value, currentStatus); 
  } else if (filterType === 'status') {
    setCurrentStatus(value);
    filterTasks(currentPriority, value);
  }
};
  return (
    <div className="flex space-x-2">
      <DropdownMenu>
        <DropdownMenuTrigger className="py-2 px-3 flex items-center gap-2  border rounded border-[#941B0F] text-center">
          <Image src={SortSvg} alt="Sort" width={14} height={14} />
          <p className="text-[#941b0f]  text-sm sm:block hidden">Sort</p>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel className=" text-sm text-[#941b0f] ">
            By Due Date
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => sortTask("asc")}>
            Closest
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => sortTask("desc")}>
            Later
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger className="py-2 px-3 flex items-center gap-2  border rounded border-[#941B0F] text-center">
          <ListFilter className="w-4 h-4 text-[#941B0F] mr-2" />
          <p className="text-[#941b0f]  text-sm sm:block hidden">Filter</p>
        </DropdownMenuTrigger>
        <DropdownMenuContent
        className=" text-sm ">
          <DropdownMenuLabel className="text-[#941b0f]">
            Priority
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => handleFilter('priority','High')}>
            High
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleFilter('priority','Medium')}>
            Medium
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleFilter('priority','Low')}>
            Low
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuLabel className="text-[#941b0f]">
            Status
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => handleFilter('status','InProgress')}>
            InProgress
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleFilter('status','Completed')}>
            Completed
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default SortFilterOptions;
