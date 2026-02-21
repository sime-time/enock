<div class="relative">
	<!-- Task list card -->
	<div class="relative rounded-2xl border border-border bg-card p-6 shadow-xl">
		<!-- Header -->
		<div class="mb-6 flex items-center justify-between">
			<div>
				<p class="font-heading text-base font-bold text-foreground">
					This Week's Plan
				</p>
				<p class="mt-0.5 text-sm text-muted-foreground">Feb 17 — Feb 23</p>
			</div>
			<span
				class="inline-flex items-center gap-1.5 rounded-full bg-primary/15 px-3 py-1 text-xs font-semibold text-primary"
			>
				<span class="size-1.5 rounded-full bg-primary"></span>
				Active
			</span>
		</div>

		<!-- Task list -->
		<div class="space-y-3">
			<!-- Task: Done -->
			<div
				class="flex items-center justify-between rounded-xl border border-border/60 bg-background/50 px-4 py-3"
			>
				<div class="flex items-center gap-3">
					<div
						class="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/15"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="size-4 text-primary"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2.5"
							stroke-linecap="round"
							stroke-linejoin="round"><polyline points="20 6 9 17 4 12" /></svg
						>
					</div>
					<div>
						<p class="text-sm font-semibold text-foreground">Deep Work</p>
						<p class="text-xs text-muted-foreground">Mon &middot; 6:00 AM</p>
					</div>
				</div>
				<span
					class="rounded-md bg-primary/15 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-primary"
					>Done</span
				>
			</div>

			<!-- Task: Done -->
			<div
				class="flex items-center justify-between rounded-xl border border-border/60 bg-background/50 px-4 py-3"
			>
				<div class="flex items-center gap-3">
					<div
						class="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/15"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="size-4 text-primary"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2.5"
							stroke-linecap="round"
							stroke-linejoin="round"><polyline points="20 6 9 17 4 12" /></svg
						>
					</div>
					<div>
						<p class="text-sm font-semibold text-foreground">Gym</p>
						<p class="text-xs text-muted-foreground">Tue &middot; 7:00 AM</p>
					</div>
				</div>
				<span
					class="rounded-md bg-primary/15 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-primary"
					>Done</span
				>
			</div>

			<!-- Task: Done -->
			<div
				class="flex items-center justify-between rounded-xl border border-border/60 bg-background/50 px-4 py-3"
			>
				<div class="flex items-center gap-3">
					<div
						class="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/15"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="size-4 text-primary"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2.5"
							stroke-linecap="round"
							stroke-linejoin="round"><polyline points="20 6 9 17 4 12" /></svg
						>
					</div>
					<div>
						<p class="text-sm font-semibold text-foreground">Skill Practice</p>
						<p class="text-xs text-muted-foreground">Wed &middot; 5:00 PM</p>
					</div>
				</div>
				<span
					class="rounded-md bg-primary/15 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-primary"
					>Done</span
				>
			</div>

			<!-- Task: Skipped -->
			<div
				class="flex items-center justify-between rounded-xl border border-border/60 bg-background/50 px-4 py-3"
			>
				<div class="flex items-center gap-3">
					<div
						class="flex size-8 shrink-0 items-center justify-center rounded-full bg-destructive/15"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="size-4 text-destructive"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2.5"
							stroke-linecap="round"
							stroke-linejoin="round"
							><line x1="18" y1="6" x2="6" y2="18" /><line
								x1="6"
								y1="6"
								x2="18"
								y2="18"
							/></svg
						>
					</div>
					<div>
						<p class="text-sm font-semibold text-foreground">Deep Work</p>
						<p class="text-xs text-muted-foreground">Thu &middot; 6:00 AM</p>
					</div>
				</div>
				<span
					class="rounded-md bg-destructive/15 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-destructive"
					>Skipped</span
				>
			</div>

			<!-- Task: Pending -->
			<div
				class="flex items-center justify-between rounded-xl border border-border/60 bg-background/50 px-4 py-3"
			>
				<div class="flex items-center gap-3">
					<div
						class="flex size-8 shrink-0 items-center justify-center rounded-full bg-muted"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="size-4 text-muted-foreground"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							><circle cx="12" cy="12" r="10" /><polyline
								points="12 6 12 12 16 14"
							/></svg
						>
					</div>
					<div>
						<p class="text-sm font-semibold text-foreground">Review Session</p>
						<p class="text-xs text-muted-foreground">Fri &middot; 4:00 PM</p>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- Execution Rate floating card -->
	<div
		class="absolute -right-4 -bottom-6 z-10 w-52 rounded-xl border border-border bg-card p-4 shadow-lg sm:-right-8 sm:-bottom-8"
	>
		<div class="mb-3 flex items-center justify-between">
			<p class="text-xs font-semibold text-foreground">Execution Rate</p>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="size-4 text-primary"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				><polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline
					points="17 6 23 6 23 12"
				/></svg
			>
		</div>
		<div class="flex items-baseline gap-1">
			<span class="font-heading text-4xl font-extrabold text-foreground"
				>78</span
			>
			<span class="text-lg font-bold text-primary">%</span>
		</div>
		<!-- Progress bar -->
		<div class="mt-3 h-2 w-full rounded-full bg-muted">
			<div class="h-2 w-[78%] rounded-full bg-primary"></div>
		</div>
		<!-- Legend -->
		<div class="mt-3 flex items-center gap-4 text-[11px] text-muted-foreground">
			<span class="flex items-center gap-1.5">
				<span class="size-2 rounded-full bg-primary"></span>
				5 completed
			</span>
			<span class="flex items-center gap-1.5">
				<span class="size-2 rounded-full bg-destructive"></span>
				2 skipped
			</span>
		</div>
	</div>
</div>
