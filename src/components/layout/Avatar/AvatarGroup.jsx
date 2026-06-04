import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "@/components/ui/avatar";

export function AvatarGroups({ members = [] }) {
  const visibleMembers = members.slice(0, 3);
  const remainingCount = members.length - 3;
  return (
    <AvatarGroup className="grayscale">
      {visibleMembers.map((member) => (
        <Avatar key={member.id}>
          <AvatarImage
            src={`${import.meta.env.VITE_SERVER_URL}${member.avatar}`}
            alt={member.fullName}
          />
          <AvatarFallback>
            {member.fullName
              ?.split(" ")
              .map((word) => word[0])
              .join("")
              .slice(0, 2)
              .toUpperCase()}
          </AvatarFallback>
        </Avatar>
      ))}

      {remainingCount > 0 && (
        <AvatarGroupCount>+{remainingCount}</AvatarGroupCount>
      )}
    </AvatarGroup>
  );
}
