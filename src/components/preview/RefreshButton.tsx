
import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

interface RefreshButtonProps {
  loading: boolean;
  onRefresh: () => void;
}

const RefreshButton: React.FC<RefreshButtonProps> = ({ loading, onRefresh }) => {
  return (
    <Button
      variant="ghost"
      size="sm"
      className="text-xs"
      onClick={onRefresh}
      disabled={loading}
    >
      <RefreshCw
        size={14}
        className={cn("mr-1", loading && "animate-spin")}
      />
      Refresh
    </Button>
  );
};

export default RefreshButton;
