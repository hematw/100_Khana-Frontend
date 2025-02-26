import { Card } from "@heroui/card";
import "./card.css"

const ShadowedCard: React.FC<{ children: React.ReactNode, className?:string }> = ({ children, className }) => {
    return (
        <div className={`card rounded-2xl transition-all duration-300 ${className}`}>
            <Card className="card2 rounded-2xl flex justify-center items-center min-h-full min-w-full">
                {children}
            </Card>
        </div>
    );
}


export default ShadowedCard;
