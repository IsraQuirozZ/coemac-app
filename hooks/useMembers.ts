import { getUsuarios } from "@/services/usuarioService";
import { mapMembersToOptions } from "@/utils/memberMapper";
import { useEffect, useState } from "react";

let cachedMembers: any[] | null = null;

export const invalidateMembersCache = () => {
  cachedMembers = null;
};

export const useMembers = () => {
  const [members, setMembers] = useState<any[]>(cachedMembers || []);
  const [options, setOptions] = useState<any[]>(
    cachedMembers ? mapMembersToOptions(cachedMembers) : [],
  );
  const [loading, setLoading] = useState(!cachedMembers);

  useEffect(() => {
    if (cachedMembers) return;

    const fetchUsers = async () => {
      try {
        const data = await getUsuarios();

        const activeMembers = data.filter((user: any) => user.activo);

        cachedMembers = activeMembers;

        setMembers(activeMembers);
        setOptions(mapMembersToOptions(activeMembers));
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return {
    members,
    options,
    loading,
  };
};
