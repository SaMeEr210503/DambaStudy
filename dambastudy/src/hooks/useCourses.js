import { useEffect, useMemo, useState } from "react";
import api from "../utils/api";
import toast from "react-hot-toast";

/**
 * useCourses
 * params: { page=1, limit=12, q, category, level, sort, minPrice, maxPrice }
 * returns: { data, loading, error, total, refetch, setPage }
 */
export default function useCourses(params = {}) {
    const [page, setPage] = useState(params.page ?? 1);
    const [limit] = useState(params.limit ?? 12);
    const [filters, setFilters] = useState(params);
    const [data, setData] = useState([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // build query
    const query = useMemo(() => ({
        page,
        limit,
        search: filters.search || filters.q || undefined,
        category: filters.category || undefined,
        level: filters.level || undefined,
        sort: filters.sort || undefined,
        minPrice: filters.minPrice || undefined,
        maxPrice: filters.maxPrice || undefined,
    }), [page, limit, filters]);

    useEffect(() => {
        let mounted = true;
        async function load() {
            setLoading(true);
            setError(null);
            try {
                const res = await api.get("/courses", { params: query });
                const payload = res.data || {};
                if (!mounted) return;
                setData(payload.courses ?? payload.items ?? payload);
                setTotal(payload.total ?? payload.count ?? 0);
            } catch (err) {
                console.error("courses fetch error", err);
                if (mounted) setError(err);
                toast.error(err?.response?.data?.message || "Failed to load courses");
            } finally {
                if (mounted) setLoading(false);
            }
        }
        load();
        return () => { mounted = false; };
    }, [JSON.stringify(query)]); // stringify to watch deep changes

    function refetch(newFilters = {}) {
        setFilters(prev => ({ ...prev, ...newFilters }));
        setPage(1);
    }

    return { data, loading, error, total, page, setPage, limit, refetch };
}
