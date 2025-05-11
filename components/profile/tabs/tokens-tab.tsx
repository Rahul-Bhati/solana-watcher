import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { formatNumber } from "@/lib/utils"
import Image from "next/image"
import { Download, Filter } from "lucide-react"
import { fetchWalletData } from "@/lib/fetchWalletData";
import useWalletStore from "@/stores"
import { useEffect, useState } from "react"
import { useTokenStore } from "@/stores/useTokenStore"

export default function TokensTab() {
  const {activeWalletId} = useWalletStore();
  const { tokens, page, total, fetchTokens, isLoading } = useTokenStore();

  useEffect(() => {
    fetchTokens(activeWalletId, page);
  }, [activeWalletId, page]);

  const totalPages = Math.ceil(total / 10);

// useEffect(() => {
//   const wallet = useWalletStore.getState().getActiveWallet();
//   if (!wallet) return;

//   fetchWalletData(wallet.id, "tokens").then(data => setTokens(data));
// }, [activeWalletId]);

console.log("tokens" , tokens, " active wallet id ", activeWalletId);

  return (
    <div className="space-y-6">
      {isLoading && <p>Loading...</p>}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-2xl font-bold">Portfolio</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Filter className="mr-2 size-4" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 size-4" />
            Export
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Token Holdings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[250px]">Token</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead className="text-right">isVerified</TableHead>
                  <TableHead className="text-right">mint</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tokens ? tokens.map((token: any) => (
                  <TableRow key={token.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <div className="size-8 rounded-full overflow-hidden bg-muted flex items-center justify-center">
                          <Image
                            src={token?.logo ? token?.logo.trim() : "/placeholder.svg"}
                            alt={token.name}
                            width={32}
                            height={32}
                            className="size-8"
                          />
                        </div>
                        <div>
                          <div className="font-semibold">{token.symbol}</div>
                          <div className="text-xs text-muted-foreground">{token.name}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      ${token.amount ? token.amount : "-"}
                    </TableCell>
                    <TableCell className="text-right">
                      {token?.isVerifiedContract ? "✅" : "❌"}
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      {token?.mint}
                    </TableCell>
                  </TableRow>
                )) : (
                  <h2>Tokens not found</h2>
                )}
              </TableBody>
            </Table>
          </div>
          {/* <div className="mt-4 flex justify-between items-center">
            <div className="text-sm text-muted-foreground">Showing {tokens.length} tokens</div>
            <div className="text-lg font-bold">Total Value: ${formatNumber(totalValue)}</div>
          </div> */}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Portfolio Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full rounded-md bg-muted/50 flex items-center justify-center">
            <p className="text-muted-foreground">Portfolio distribution chart would appear here</p>
          </div>
        </CardContent>
      </Card>

      <div className="mt-4 flex justify-between">
        <button onClick={() => fetchTokens(activeWalletId, page - 1)} disabled={page === 1}>Prev</button>
        <span>{page} / {totalPages}</span>
        <button onClick={() => fetchTokens(activeWalletId, page + 1)} disabled={page === totalPages}>Next</button>
      </div>
    </div>
  )
}
