import {
  ChevronDownIcon,
  ClockIcon,
  PlayIcon,
  SunIcon,
} from "@heroicons/react/24/outline";

export default function Home() {
  return (
    <div className="font-poppins h-full flex flex-col">
      <header>
        <nav className="bg-linear-to-b from-sky-700 to-sky-500 text-sky-50 tracking-wide">
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex shrink-0 items-center">
                  <ClockIcon className="text-sky-50 size-8" />
                </div>
                <div className="ml-4">
                  <div className="relative flex gap-2">
                    <div className="absolute inset-y-0 rounded-full bg-white/20 transition-all duration-300 ease-in-out">
                    </div>
                    <a
                      href="javascript:;"
                      className="router-link-active router-link-exact-active relative z-10 rounded-full px-3 py-2 text-sm transition-colors duration-300 text-sky-50"
                      aria-current="page"
                    >
                      <span>TimeFlow</span>
                    </a>
                    <a
                      href="/projects"
                      className="relative z-10 rounded-full px-3 py-2 text-sm transition-colors duration-300 text-sky-100 hover:text-sky-50"
                    >
                      <span>Projects</span>
                    </a>
                    <a
                      href="/invoice"
                      className="relative z-10 rounded-full px-3 py-2 text-sm transition-colors duration-300 text-sky-100 hover:text-sky-50"
                    >
                      <span className="hidden xs:inline">Create Invoice</span>
                      <span className="xs:hidden">Invoice</span>
                    </a>
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <button
                  className="cursor-pointer p-2 size-10 rounded-full flex items-center justify-center shrink-0 transition-all duration-200 text-sky-100 hover:text-sky-50 hover:bg-white/10"
                  title="Switch to light mode"
                  aria-label="Switch to light mode"
                >
                  <SunIcon className="size-5" />
                </button>
              </div>
            </div>
          </div>
        </nav>
      </header>
      <div className="bg-gradient-to-b from-amber-400 to-orange-400 px-4 py-3">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center justify-center">
            <div className="text-center">
              <p className="text-amber-900 font-medium">
                <span className="sm:hidden">
                  🚧 IS TimeTracker IS growing! New features are coming soon.
                </span>
                <span className="hidden sm:inline lg:hidden">
                  🚧 IS TimeTracker IS still in development and improving! New
                  features are coming soon.
                </span>
                <span className="hidden lg:inline">
                  🚧 Welcome to IS TimeTracker! This app IS still in development
                  and actively improving. Exciting new features are coming soon!
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <main className="space-y-6 lg:space-y-10 p-4 sm:p-6 lg:p-8 flex flex-col grow dark:bg-slate-900">
        <div className="mx-auto w-full max-w-3xl">
          <div className="grid grid-cols-1">
            <select
              name="project"
              className="appearance-none col-start-1 row-start-1 pr-8 block w-full rounded-full bg-white dark:bg-slate-800 px-4 py-2.5 text-base text-gray-900 dark:text-gray-100 outline-1 -outline-offset-1 outline-gray-200 dark:outline-gray-600 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-sky-600 dark:focus:outline-sky-400 sm:text-sm/6"
            >
              <option>Select Project</option>
              <option
                className="bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100"
                value="pmxSdH5fITgoiZfSpAZf"
              >
                One more project
              </option>
              <option
                className="bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100"
                value="u0QcLIwbL5wFVhaAUnIv"
              >
                My Project
              </option>
            </select>
            <ChevronDownIcon className="pointer-events-none col-start-1 row-start-1 mr-4 size-5 self-center justify-self-end text-gray-500 dark:text-gray-400 sm:size-4" />
          </div>
        </div>
        <div className="text-center">
          <div className="inline-flex items-center gap-4 p-4 pl-10 rounded-full bg-white dark:bg-slate-800 shadow-[inset_0_2px_4px_0_rgb(0,0,0,0.15)] dark:shadow-[inset_0_2px_4px_0_rgb(0,0,0,0.3)]">
            <div className="text-4xl w-40 text-left text-sky-950 dark:text-slate-100">
              00:00:00
            </div>
            <div>
              <button
                type="button"
                className="cursor-pointer size-20 rounded-full bg-linear-to-b from-sky-700 to-sky-500 text-white disabled:opacity-50 flex items-center justify-center hover:from-sky-500 hover:to-sky-500 transition-colors"
              >
                <PlayIcon className="size-10 translate-x-0.5" />
              </button>
            </div>
          </div>
        </div>
        <div className="mx-auto w-full max-w-3xl">
          <nav
            className="relative flex bg-white dark:bg-slate-800 ring-1 ring-gray-200 dark:ring-gray-600 rounded-full p-2 justify-between *:flex-1 *:cursor-pointer"
            aria-label="Tabs"
          >
            <div className="absolute inset-y-2 rounded-full px-3 py-2 bg-gray-100 dark:bg-slate-700 transition-all duration-300 ease-in-out">
            </div>
            <button className="relative z-10 rounded-full px-3 py-2 text-sm font-medium transition-colors text-gray-700 dark:text-gray-200">
              Today
            </button>
            <button className="relative z-10 rounded-full px-3 py-2 text-sm font-medium transition-colors text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
              This Week
            </button>
            <button className="relative z-10 rounded-full px-3 py-2 text-sm font-medium transition-colors text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
              This Month
            </button>
          </nav>
        </div>
        <div className="mx-auto w-full max-w-3xl p-px overflow-y-auto space-y-2">
          <div className="flex justify-end items-center gap-1 text-xs pr-4">
            <span className="text-gray-600 dark:text-gray-400">Total:</span>
            <p>0h 0m 0s</p>
          </div>
          <div className="grid gap-2 mb-4">
            <div className="space-y-2">
              <div className="rounded-full p-2 bg-white dark:bg-slate-800">
                <div className="flex gap-2 items-center">
                  <button
                    className="cursor-pointer p-2 size-10 rounded-full flex items-center justify-center shrink-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent text-gray-400 hover:bg-sky-50 dark:text-gray-500 dark:hover:bg-slate-700"
                    title="Expand"
                  >
                    <ChevronDownIcon className="size-5" />
                  </button>
                  <div className="size-10 rounded-full flex justify-center items-center bg-sky-100 dark:bg-sky-900 text-sky-800 dark:text-sky-200 uppercase">
                    Om
                  </div>
                  <h3>One more project</h3>
                  <p className="ml-auto shrink-0 w-20 text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
                    0h 0m 0s
                  </p>
                  <button
                    className="cursor-pointer p-2 size-10 rounded-full flex items-center justify-center shrink-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent text-sky-600 hover:text-sky-800 hover:bg-sky-50 dark:text-sky-400 dark:hover:text-sky-300 dark:hover:bg-slate-700"
                    title="Start timer"
                  >
                    <PlayIcon className="size-5 translate-x-px" />
                  </button>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="rounded-full p-2 bg-white dark:bg-slate-800">
                <div className="flex gap-2 items-center">
                  <button
                    className="cursor-pointer p-2 size-10 rounded-full flex items-center justify-center shrink-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent text-gray-400 hover:bg-sky-50 dark:text-gray-500 dark:hover:bg-slate-700"
                    title="Expand"
                  >
                    <ChevronDownIcon className="size-5" />
                  </button>
                  <div className="size-10 rounded-full flex justify-center items-center bg-sky-100 dark:bg-sky-900 text-sky-800 dark:text-sky-200 uppercase">
                    MP
                  </div>
                  <h3>My Project</h3>
                  <p className="ml-auto shrink-0 w-20 text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
                    0h 0m 0s
                  </p>
                  <button
                    className="cursor-pointer p-2 size-10 rounded-full flex items-center justify-center shrink-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent text-sky-600 hover:text-sky-800 hover:bg-sky-50 dark:text-sky-400 dark:hover:text-sky-300 dark:hover:bg-slate-700"
                    title="Start timer"
                  >
                    <PlayIcon className="size-5 translate-x-px" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
