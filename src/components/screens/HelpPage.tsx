import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { HelpCircle, ExternalLink, Mail, MessageCircle, Book } from 'lucide-react';

interface HelpPageProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

const helpItems = [
  {
    title: 'Getting Started',
    description: 'Learn the basics of using Woozi extension',
    icon: Book,
    action: 'View Guide'
  },
  {
    title: 'Contact Support',
    description: 'Get help from our support team',
    icon: Mail,
    action: 'Send Email'
  },
  {
    title: 'Community Forum',
    description: 'Connect with other users and share tips',
    icon: MessageCircle,
    action: 'Visit Forum'
  },
  {
    title: 'Documentation',
    description: 'Comprehensive guides and API references',
    icon: ExternalLink,
    action: 'Open Docs'
  }
];

const faqItems = [
  {
    question: 'How do I add new leads?',
    answer: 'Navigate to the Leads tab and click the "Add Lead" button to create a new lead entry.'
  },
  {
    question: 'Can I import leads from CSV?',
    answer: 'CSV import functionality is coming soon. Currently, you can add leads manually.'
  },
  {
    question: 'How do I track campaign performance?',
    answer: 'Visit the Campaigns tab to see detailed metrics and performance data for all your campaigns.'
  },
  {
    question: 'Is my data secure?',
    answer: 'Yes, all data is encrypted and stored securely. We follow industry-standard security practices.'
  }
];

export function HelpPage({ activeTab, onTabChange }: HelpPageProps) {
  return (
    <div className="p-4 space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <HelpCircle className="h-5 w-5" />
            Help & Support
          </CardTitle>
          <CardDescription>
            Find answers to common questions and get support
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="space-y-3">
        {helpItems.map((item, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <item.icon className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
                <button className="px-3 py-1 text-sm bg-muted hover:bg-muted/80 rounded-md transition-colors">
                  {item.action}
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {faqItems.map((faq, index) => (
            <div key={index} className="space-y-2">
              <h4 className="font-medium text-sm">{faq.question}</h4>
              <p className="text-sm text-muted-foreground">{faq.answer}</p>
              {index < faqItems.length - 1 && <hr className="border-border" />}
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4 text-center">
          <p className="text-sm text-muted-foreground mb-2">
            Can't find what you're looking for?
          </p>
          <button className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90">
            <Mail className="h-4 w-4" />
            Contact Support
          </button>
        </CardContent>
      </Card>
    </div>
  );
}