import { Button, Card } from "@nextui-org/react";

/**
 * Hub
 * 
 * @returns
 */
export default function () {

    return <div className="grid grid-cols-3 gap-3">
        <Card as={Button} className="h-[300px] smooth">
        </Card>
    </div>
}