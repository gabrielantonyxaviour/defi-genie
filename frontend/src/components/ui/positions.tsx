import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function Positions() {
  return (
    <div className="space-y-8">
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/coins/usdt.png" alt="Avatar" />
          <AvatarFallback>OM</AvatarFallback>
        </Avatar>
        <Avatar className="h-9 w-9 relative -left-4">
          <AvatarImage src="/coins/bnb.png" alt="Avatar" />
          <AvatarFallback>OM</AvatarFallback>
        </Avatar>
        <div className="space-y-1">
          <p className="text-sm font-medium leading-none">USDT / BNB</p>
          <p className="text-xs text-muted-foreground">
            Min: 400 UDST - Max: 900 USDT
          </p>
        </div>
        <div className="ml-auto space-y-1 text-right">
          <p className="text-sm font-medium leading-none">0.000045</p>
          <p className="text-sm text-muted-foreground">$1.89</p>
        </div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/coins/usdt.png" alt="Avatar" />
          <AvatarFallback>OM</AvatarFallback>
        </Avatar>
        <Avatar className="h-9 w-9 relative -left-4">
          <AvatarImage src="/coins/bnb.png" alt="Avatar" />
          <AvatarFallback>OM</AvatarFallback>
        </Avatar>
        <div className="space-y-1">
          <p className="text-sm font-medium leading-none">USDT / BNB</p>
          <p className="text-xs text-muted-foreground">
            Min: 400 UDST - Max: 900 USDT
          </p>
        </div>
        <div className="ml-auto space-y-1 text-right">
          <p className="text-sm font-medium leading-none">0.000045</p>
          <p className="text-sm text-muted-foreground">$1.89</p>
        </div>
      </div>{" "}
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/coins/usdt.png" alt="Avatar" />
          <AvatarFallback>OM</AvatarFallback>
        </Avatar>
        <Avatar className="h-9 w-9 relative -left-4">
          <AvatarImage src="/coins/bnb.png" alt="Avatar" />
          <AvatarFallback>OM</AvatarFallback>
        </Avatar>
        <div className="space-y-1">
          <p className="text-sm font-medium leading-none">USDT / BNB</p>
          <p className="text-xs text-muted-foreground">
            Min: 400 UDST - Max: 900 USDT
          </p>
        </div>
        <div className="ml-auto space-y-1 text-right">
          <p className="text-sm font-medium leading-none">0.000045</p>
          <p className="text-sm text-muted-foreground">$1.89</p>
        </div>
      </div>
    </div>
  );
}
