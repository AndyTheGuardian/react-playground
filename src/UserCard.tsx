type UserCardProps = {
  name: string;
  age: number;
  isSenior: boolean;
};

function UserCard({ name, age, isSenior }: UserCardProps) {
  return (
    <div>
      <p>
        {isSenior && "⭐"} User: {name} ({age})
      </p>
    </div>
  );
}

export default UserCard;
