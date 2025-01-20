import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, MapPin } from "lucide-react";

const contactInfo = [
  { name: "Mohammad Ali", role: "Joint Coordinator", phone: "+91 7906350149" },
  { name: "Avyukt Soni", role: "Web Developer", phone: "+91 6399454765" },
  { name: "Sharjeel Afridi", role: "Web Developer", phone: "+91 9555083107" },
];

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
      <Card>
        <CardHeader>
          <CardTitle>
            Get in touch with us if you are facing some issue.
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <Mail className="h-5 w-5" />
            <span>amuroboclub@gmail.com</span>
          </div>
          <div className="flex items-center space-x-2">
            <MapPin className="h-5 w-5" />
            <span>
              AMURoboclub, Department of Mechanical Engineering, Aligarh Muslim
              University, Aligarh, Uttar Pradesh, India
            </span>
          </div>
          <div className="space-y-2">
            {contactInfo.map((contact, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Phone className="h-5 w-5" />
                <span>
                  {contact.name} ({contact.role}): {contact.phone}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
