import { Button, LinkButton } from '@/components/ui/Button';

export default function DemoPage() {
  return (
    <div className="p-8 space-y-10">
      <h1 className="text-3xl font-bold">UI Components Demo</h1>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Button Component</h2>

        <div className="space-y-4">
          <h3 className="text-xl font-medium">Variants</h3>
          <div className="flex gap-4 flex-wrap">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-medium">Sizes</h3>
          <div className="flex items-center gap-4 flex-wrap">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-medium">Disabled State</h3>
          <div className="flex gap-4">
            <Button disabled>Disabled</Button>
            <Button variant="outline" disabled>
              Disabled Outline
            </Button>
          </div>
        </div>
      </section>

      <section className="space-y-6 pt-8 border-t border-gray-200">
        <h2 className="text-2xl font-semibold">LinkButton Component</h2>

        <div className="space-y-4">
          <h3 className="text-xl font-medium">Variants</h3>
          <div className="flex gap-4 flex-wrap">
            <LinkButton href="#" variant="primary">
              Primary Link
            </LinkButton>
            <LinkButton href="#" variant="secondary">
              Secondary Link
            </LinkButton>
            <LinkButton href="#" variant="outline">
              Outline Link
            </LinkButton>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-medium">Sizes</h3>
          <div className="flex items-center gap-4 flex-wrap">
            <LinkButton href="#" size="sm">
              Small Link
            </LinkButton>
            <LinkButton href="#" size="md">
              Medium Link
            </LinkButton>
            <LinkButton href="#" size="lg">
              Large Link
            </LinkButton>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-medium">Example Usage</h3>
          <div className="space-y-2">
            <p>This is a paragraph with an inline <LinkButton
              href="/dashboard"
              variant="outline"
              size="sm"
              className="align-middle"
            >
              Dashboard Link
            </LinkButton> that looks like a button.</p>

            <p>Or a <LinkButton
              href="/dashboard/customer"
              variant="secondary"
              size="sm"
              className="align-middle"
            >
              Customer Page
            </LinkButton> link that stands out more.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
