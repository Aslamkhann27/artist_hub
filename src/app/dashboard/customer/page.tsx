import { getCustomerDashboardData } from '@/lib/data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import type { Order } from '@/lib/types';
import Link from 'next/link';

// Hardcoded customer ID for demonstration
const LOGGED_IN_CUSTOMER_ID = 'cust-1';

const getStatusVariant = (status: Order['status']) => {
  switch (status) {
    case 'Delivered':
      return 'default';
    case 'Shipped':
      return 'secondary';
    case 'Processing':
      return 'outline';
    default:
      return 'default';
  }
};

export default async function CustomerDashboardPage() {
  const customer = await getCustomerDashboardData(LOGGED_IN_CUSTOMER_ID);

  if (!customer) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Avatar className="h-20 w-20">
          <AvatarImage src={customer.avatarUrl} alt={customer.name} />
          <AvatarFallback className="text-3xl">{customer.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-3xl font-bold font-headline text-primary">Hello, {customer.name}</h1>
          <p className="text-muted-foreground">Welcome to your dashboard. View your recent orders below.</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your Order History</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Artwork</TableHead>
                <TableHead>Order Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customer.orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>
                    <div className="flex items-center gap-4">
                      <Image
                        src={order.artwork.imageUrl}
                        alt={order.artwork.title}
                        width={64}
                        height={64}
                        className="rounded-md object-cover"
                      />
                      <div>
                        <Link href={`/artwork/${order.artwork.id}`} className="font-medium hover:underline">
                          {order.artwork.title}
                        </Link>
                        <div className="text-sm text-muted-foreground">{order.artwork.style}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{new Date(order.date).toLocaleDateString('en-IN')}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(order.status)}>{order.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right">₹{order.total.toLocaleString('en-IN')}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
