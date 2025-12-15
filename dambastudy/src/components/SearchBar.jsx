import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X } from "lucide-react";

export default function SearchBar({ onSearch, placeholder = "Search courses..." }) {
    const [query, setQuery] = useState("");
    const [isExpanded, setIsExpanded] = useState(false);
    const navigate = useNavigate();

    // Debounced search
    const debounce = (func, delay) => {
        let timeoutId;
        return (...args) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func(...args), delay);
        };
    };

    const debouncedSearch = useCallback(
        debounce((searchQuery) => {
            if (onSearch) {
                onSearch(searchQuery);
            }
        }, 300),
        [onSearch]
    );

    const handleChange = (e) => {
        const value = e.target.value;
        setQuery(value);
        debouncedSearch(value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (query.trim()) {
            navigate(`/courses?search=${encodeURIComponent(query.trim())}`);
            setIsExpanded(false);
        }
    };

    const handleClear = () => {
        setQuery("");
        if (onSearch) onSearch("");
    };

    return (
        <form onSubmit={handleSubmit} className="search-bar">
            <div className={`search-bar-container ${isExpanded ? "expanded" : ""}`}>
                <Search className="search-bar-icon" size={18} />
                <input
                    type="text"
                    value={query}
                    onChange={handleChange}
                    onFocus={() => setIsExpanded(true)}
                    onBlur={() => !query && setIsExpanded(false)}
                    placeholder={placeholder}
                    className="search-bar-input"
                />
                {query && (
                    <button
                        type="button"
                        onClick={handleClear}
                        className="search-bar-clear"
                    >
                        <X size={16} />
                    </button>
                )}
            </div>

            <style>{`
        .search-bar {
          position: relative;
        }

        .search-bar-container {
          display: flex;
          align-items: center;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 0.75rem;
          padding: 0.5rem 1rem;
          transition: all 0.3s ease;
          width: 200px;
        }

        .search-bar-container:focus-within,
        .search-bar-container.expanded {
          width: 280px;
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(168, 85, 247, 0.3);
          box-shadow: 0 0 0 3px rgba(168, 85, 247, 0.1);
        }

        .search-bar-icon {
          color: #8a8a8a;
          flex-shrink: 0;
          margin-right: 0.5rem;
        }

        .search-bar-input {
          flex: 1;
          background: transparent;
          border: none;
          outline: none;
          color: #f5f5f5;
          font-size: 0.9rem;
          padding: 0;
          width: 100%;
        }

        .search-bar-input::placeholder {
          color: #6b6b6b;
        }

        .search-bar-clear {
          display: flex;
          align-items: center;
          justify-content: center;
          background: transparent;
          border: none;
          color: #8a8a8a;
          cursor: pointer;
          padding: 0;
          margin-left: 0.5rem;
          box-shadow: none;
        }

        .search-bar-clear:hover {
          color: #f5f5f5;
          transform: none;
        }

        @media (max-width: 768px) {
          .search-bar-container {
            width: 40px;
            padding: 0.5rem;
            justify-content: center;
          }

          .search-bar-container .search-bar-input {
            display: none;
          }

          .search-bar-container:focus-within,
          .search-bar-container.expanded {
            width: 200px;
            padding: 0.5rem 1rem;
          }

          .search-bar-container:focus-within .search-bar-input,
          .search-bar-container.expanded .search-bar-input {
            display: block;
          }

          .search-bar-icon {
            margin-right: 0;
          }

          .search-bar-container:focus-within .search-bar-icon,
          .search-bar-container.expanded .search-bar-icon {
            margin-right: 0.5rem;
          }
        }
      `}</style>
        </form>
    );
}
