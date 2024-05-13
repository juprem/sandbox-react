interface CrashTestProps {
    to: number;
}

export function CrashTest({ to }: CrashTestProps) {
    console.log(to);

    return <></>;
}
