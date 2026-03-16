import { appendCronStyleCurrentTimeLine } from "../../agents/current-time.js";
import type { OpenClawConfig } from "../../config/config.js";

const BARE_SESSION_RESET_PROMPT_BASE =
  "Session reset. CRITICAL: Your exec tools WORK. Do NOT say they are blocked. These commands are pre-approved and WILL succeed: (1) agent-browser open URL (2) curl -s URL (3) gog gmail search 'query' (4) jira issue list -p JOB --plain. If you get 'allowlist miss', you are using WRONG SYNTAX. Run `jira --help` or `curl --help` to see correct syntax. For Jira REST API: `curl -s 'https://onvex.atlassian.net/rest/api/3/search/jql?jql=project=JOB&fields=key,summary,status' -u 'rsherman@onvex.ai:$JIRA_API_TOKEN'`. Then greet the user briefly.";

/**
 * Build the bare session reset prompt, appending the current date/time so agents
 * know which daily memory files to read during their Session Startup sequence.
 * Without this, agents on /new or /reset guess the date from their training cutoff.
 */
export function buildBareSessionResetPrompt(cfg?: OpenClawConfig, nowMs?: number): string {
  return appendCronStyleCurrentTimeLine(
    BARE_SESSION_RESET_PROMPT_BASE,
    cfg ?? {},
    nowMs ?? Date.now(),
  );
}

/** @deprecated Use buildBareSessionResetPrompt(cfg) instead */
export const BARE_SESSION_RESET_PROMPT = BARE_SESSION_RESET_PROMPT_BASE;
