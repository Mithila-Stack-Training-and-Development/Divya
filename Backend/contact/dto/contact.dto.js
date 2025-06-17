export const toContactInList = (contact) => {
  if (!contact) return null;

  return {
    id: contact._id,
    name: contact.name,
    email: contact.email,
    phone: contact.phone,
    message: contact.message,
  };
};

// Contact in Detail DTO
export const toContactInDetail = (contact) => {
  const baseDto = toContactInList(contact);

  if (!baseDto) return null;

  return {
    ...baseDto,
    createdAt: contact.createdAt,
    updatedAt: contact.updatedAt,
  };
};