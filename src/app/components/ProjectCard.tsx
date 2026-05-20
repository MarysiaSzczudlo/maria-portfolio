import { useState } from 'react';
import { Link } from 'react-router';

interface ProjectCardProps {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  year: string;
  badge?: string;
  coverImage?: string;
}

export function ProjectCard({
  id,
  title,
  subtitle,
  description,
  tags,
  year,
  badge,
  coverImage,
}: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link to={`/project/${id}`}>
      <div
        className="cursor-pointer transition-all duration-300 group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image Container */}
        <div
          className="w-full rounded-lg mb-8 overflow-hidden transition-all duration-300 relative"
          style={{
            aspectRatio: '16/9',
            backgroundColor: isHovered ? 'var(--portfolio-hover-bg)' : '#FAFAFA',
            border: `1px solid var(--portfolio-border)`,
            transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
            boxShadow: isHovered
              ? '0 20px 60px rgba(0, 0, 0, 0.12)'
              : '0 4px 20px rgba(0, 0, 0, 0.04)',
          }}
        >
          {/* Project Cover Image */}
          {coverImage ? (
            <img
              src={coverImage}
              alt={title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <p
                className="font-normal"
                style={{
                  fontSize: '14px',
                  color: 'var(--portfolio-text-tertiary)',
                }}
              >
                [Project Image]
              </p>
            </div>
          )}

          {/* Glassmorphism overlay on hover */}
          {isHovered && (
            <div
              className="absolute inset-0 flex items-center justify-center transition-opacity duration-300"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.4)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
              }}
            >
              <div
                className="px-6 py-3 rounded-full font-normal"
                style={{
                  fontSize: '14px',
                  color: 'var(--portfolio-text-primary)',
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  border: '1px solid rgba(0, 0, 0, 0.1)',
                }}
              >
                View Case Study →
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="space-y-4">
          {/* Title Row */}
          <div className="flex items-baseline justify-between">
            <div className="flex items-baseline gap-3">
              <h3
                className="font-normal"
                style={{
                  fontSize: '24px',
                  color: isHovered
                    ? 'var(--portfolio-accent)'
                    : 'var(--portfolio-text-primary)',
                  transition: 'color 0.2s',
                }}
              >
                {title}
              </h3>
              <span
                className="font-normal"
                style={{
                  fontSize: '20px',
                  color: 'var(--portfolio-text-tertiary)',
                }}
              >
                {subtitle}
              </span>
            </div>
            <span
              className="font-normal"
              style={{
                fontSize: '16px',
                color: 'var(--portfolio-text-tertiary)',
              }}
            >
              {year}
            </span>
          </div>

          {/* Badge with Glassmorphism */}
          {badge && (
            <div
              className="inline-block px-4 py-2 rounded-full"
              style={{
                fontSize: '12px',
                color: 'var(--portfolio-accent)',
                backgroundColor: 'rgba(0, 102, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                border: '1px solid rgba(0, 102, 255, 0.1)',
              }}
            >
              {badge}
            </div>
          )}

          {/* Description */}
          <p
            className="font-normal max-w-4xl"
            style={{
              fontSize: '16px',
              color: 'var(--portfolio-text-secondary)',
              lineHeight: '1.6',
            }}
          >
            {description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="font-normal"
                style={{
                  fontSize: '14px',
                  color: 'var(--portfolio-text-tertiary)',
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
