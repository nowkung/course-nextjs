import { Button } from '@/components/ui/Button';

export default function DemoPage() {
  return (
    <div className="p-8 space-y-6">
      <h1 className="text-3xl font-bold">Button Component Demo</h1>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Variants</h2>
        <div className="flex gap-4 flex-wrap">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Sizes</h2>
        <div className="flex items-center gap-4 flex-wrap">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Disabled State</h2>
        <div className="flex gap-4">
          <Button disabled>Disabled</Button>
          <Button variant="outline" disabled>
            Disabled Outline
          </Button>
        </div>
      </div>
    </div>
  );
}
