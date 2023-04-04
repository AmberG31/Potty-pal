import React from 'react';
import {
  AdjustmentsVerticalIcon,
  ChevronDownIcon,
} from '@heroicons/react/24/solid';

function Sidebar() {
  // const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="w-[300px] border border-r-2 p-4">
      <div className="flex justify-between border p-4">
        <div className="flex justify-center gap-2">
          <AdjustmentsVerticalIcon className="w-6" />
          <p className="text-lg font-semibold">Filters</p>
        </div>
        <div className="flex justify-center">
          <ChevronDownIcon className="w-5" />
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
