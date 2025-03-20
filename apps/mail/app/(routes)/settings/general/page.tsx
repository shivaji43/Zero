'use client';

import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
} from '@/components/ui/form';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { saveUserSettings, UserSettings } from '@/actions/settings';
import { SettingsCard } from '@/components/settings/settings-card';
import { getBrowserTimezone, TIMEZONES } from '@/utils/timezones';
import { availableLocales, Locale, locales } from '@/i18n/config';
import { useLocale, useTranslations } from 'next-intl';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSettings } from '@/hooks/use-settings';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Globe, Clock } from 'lucide-react';
import { changeLocale } from '@/i18n/utils';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { toast } from 'sonner';
import * as z from 'zod';

const formSchema = z.object({
	language: z.enum(locales as [string, ...string[]]),
	timezone: z.string(),
	dynamicContent: z.boolean(),
	externalImages: z.boolean(),
});

export default function GeneralPage() {
	const locale = useLocale();
	const t = useTranslations();
	const { settings, mutate } = useSettings();
	const [isPending, setIsPending] = useState(false);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		values: settings
			? {
					language: settings.language ?? (locale as Locale),
					timezone: settings.timezone ?? getBrowserTimezone(),
					dynamicContent: settings.dynamicContent ?? false,
					externalImages: settings.externalImages ?? true,
				}
			: {
					language: locale as Locale,
					timezone: getBrowserTimezone(),
					dynamicContent: false,
					externalImages: true,
				},
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		try {
			setIsPending(true);
			await saveUserSettings(values as UserSettings);
			await mutate();
			changeLocale(values.language as Locale);
			toast.success('Settings saved successfully');
		} catch (error) {
			console.error('Failed to save settings:', error);
			toast.error('Failed to save settings');
		} finally {
			setIsPending(false);
		}
	}

	return (
		<div className="grid gap-6">
			<SettingsCard
				title={t('pages.settings.general.title')}
				description={t('pages.settings.general.description')}
				footer={
					<Button type="submit" form="general-form" disabled={isPending}>
						{isPending ? t('common.actions.saving') : t('common.actions.saveChanges')}
					</Button>
				}
			>
				<Form {...form}>
					<form id="general-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
						<div className="flex w-full items-center gap-5">
							<FormField
								control={form.control}
								name="language"
								render={({ field }) => (
									<FormItem>
										<FormLabel>{t('pages.settings.general.language')}</FormLabel>
										<Select onValueChange={field.onChange} value={field.value}>
											<FormControl>
												<SelectTrigger className="w-36">
													<Globe className="mr-2 h-4 w-4" />
													<SelectValue placeholder="Select a language" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{availableLocales.map((locale) => (
													<SelectItem key={locale.code} value={locale.code}>
														{locale.name}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="timezone"
								render={({ field }) => (
									<FormItem>
										<FormLabel>{t('pages.settings.general.timezone')}</FormLabel>
										<Select onValueChange={field.onChange} value={field.value}>
											<FormControl>
												<SelectTrigger className="w-fit">
													<Clock className="mr-2 h-4 w-4" />
													<SelectValue placeholder="Select a timezone" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{Object.entries(TIMEZONES).map(([value, label]) => (
													<SelectItem key={value} value={value}>
														{label}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</FormItem>
								)}
							/>
						</div>
						<div className="flex w-full items-center gap-5">
							<FormField
								control={form.control}
								name="dynamicContent"
								render={({ field }) => (
									<FormItem className="bg-popover flex flex-row items-center justify-between rounded-lg border p-4">
										<div className="space-y-0.5">
											<FormLabel className="text-base">
												{t('pages.settings.general.dynamicContent')}
											</FormLabel>
											<FormDescription>
												{t('pages.settings.general.dynamicContentDescription')}
											</FormDescription>
										</div>
										<FormControl className="ml-4">
											<Switch checked={field.value} onCheckedChange={field.onChange} />
										</FormControl>
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="externalImages"
								render={({ field }) => (
									<FormItem className="bg-popover flex flex-row items-center justify-between rounded-lg border p-4">
										<div className="space-y-0.5">
											<FormLabel className="text-base">
												{t('pages.settings.general.externalImages')}
											</FormLabel>
											<FormDescription>
												{t('pages.settings.general.externalImagesDescription')}
											</FormDescription>
										</div>
										<FormControl className="ml-4">
											<Switch checked={field.value} onCheckedChange={field.onChange} />
										</FormControl>
									</FormItem>
								)}
							/>
						</div>
					</form>
				</Form>
			</SettingsCard>
		</div>
	);
}
