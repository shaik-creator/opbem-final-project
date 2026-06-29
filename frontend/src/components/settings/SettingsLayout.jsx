import { ArrowLeft } from 'lucide-react';
import Button from '../common/Button';
import SettingsMenu from './SettingsMenu';
import SettingsProfileCard from './SettingsProfileCard';
import { classNames } from '../../utils/formatters';

export default function SettingsLayout({
  items,
  activeKey,
  activeItem,
  onSelect,
  showDetail,
  onBack,
  user,
  profile,
  children
}) {
  return (
    <div className="grid min-w-0 gap-5 lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)]">
      <aside className={classNames('lg:block', showDetail ? 'hidden' : 'block')}>
        <SettingsProfileCard user={user} profile={profile} />
        <div className="overflow-hidden rounded-lg border border-[#dbe3ea] bg-white shadow-card">
          <SettingsMenu items={items} activeKey={activeKey} onSelect={onSelect} />
        </div>
      </aside>
      <section className={classNames('min-w-0', showDetail ? 'block' : 'hidden lg:block')}>
        <div className="mb-4 flex items-center gap-2 lg:hidden">
          <Button variant="ghost" className="h-10 w-10 px-0" onClick={onBack} aria-label="Back to settings menu">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="min-w-0">
            <p className="break-words text-sm font-semibold text-gray-900">{activeItem?.title}</p>
            <p className="break-words text-xs text-gray-500">Settings details</p>
          </div>
        </div>
        {children}
      </section>
    </div>
  );
}
