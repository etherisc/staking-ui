export function formatInstanceId(instanceId: string) {
    return instanceId.substring(0, 6) + "…" + instanceId.substring(instanceId.length - 4);
}