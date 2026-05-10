import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardAction,
  CardContent,
  CardFooter,
  CardTitle,
  CardDescription,
} from "../../components/ui/card";

function Dashboard() {
  return (
    <>
      <div className="grid grid-cols-4 gap-5">
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Dashboard</h3>
          </CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
          <CardAction>
            <Button variant="secondary">Action</Button>
          </CardAction>
          <CardContent>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas
              quisquam doloremque dicta, voluptate corporis deleniti.
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="outline">Footer Action</Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Dashboard</h3>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Dashboard</h3>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Dashboard</h3>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Dashboard</h3>
          </CardHeader>
        </Card>
      </div>
    </>
  );
}

export default Dashboard;
