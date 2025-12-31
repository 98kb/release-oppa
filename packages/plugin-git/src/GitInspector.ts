import {
  type SimpleGitOptions,
  type SimpleGit,
  type RemoteWithRefs,
  simpleGit,
} from "simple-git";

export class GitInspector {
  readonly git: SimpleGit;

  constructor(gitOptions: Partial<SimpleGitOptions>) {
    this.git = simpleGit(gitOptions);
  }

  async toRemotes(): Promise<Record<string, RemoteWithRefs["refs"]>> {
    const result = await this.git.getRemotes(true);
    return Object.fromEntries(result.map(r => [r.name, r.refs]));
  }

  async toDetails(): Promise<{
    CurrentBranch: string;
    LatestTag: string | null;
    Remotes: Record<string, RemoteWithRefs["refs"]>;
  }> {
    const CurrentBranch = (await this.git.branch()).current;
    const tags = await this.git.tags();
    const LatestTag = tags.latest ?? null;
    const Remotes = await this.toRemotes();
    return {
      CurrentBranch,
      LatestTag,
      Remotes,
    };
  }
}
