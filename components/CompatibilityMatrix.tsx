'use client';

import React from 'react';
import Markdown from 'markdown-to-jsx';
import styled, { css } from 'styled-components';
import {
  Search,
  Check,
  Close,
  Contrast,
  ContentPasteSearch,
  ChevronRight,
  HourglassEmpty,
  OpenInNew,
} from '@styled-icons/material';
import { theme, font } from '../utils/theme';
import { navbarHeight } from '../utils/sizes';
import { CATEGORY_LABELS, SUPPORT_LABELS, type Category, type MergedEntry, type Support } from '../utils/cssCompat';

interface Props {
  entries: MergedEntry[];
}

interface FilterState {
  query: string;
  category: Category | 'all';
  platform: 'all' | 'web' | 'native';
}

const INITIAL: FilterState = { query: '', category: 'all', platform: 'all' };

// Render summaries and caveats inline so the parent <p> / <li> stays the block container.
const MARKDOWN_OPTIONS = { forceInline: true } as const;

const CATEGORY_KEYS = Object.keys(CATEGORY_LABELS) as Category[];

const PR_COLUMNS = [
  { key: 'v6', label: 'v6' },
  { key: 'v7', label: 'v7' },
  { key: 'ios', label: 'iOS' },
  { key: 'android', label: 'Android' },
] as const;

const BROWSER_COLUMNS = [
  { key: 'chrome', label: 'Chrome' },
  { key: 'safari', label: 'Safari' },
  { key: 'firefox', label: 'Firefox' },
  { key: 'edge', label: 'Edge' },
] as const;

interface SearchableEntry extends MergedEntry {
  searchIndex: string;
}

export default function CompatibilityMatrix({ entries }: Props) {
  const [state, setState] = React.useState<FilterState>(INITIAL);
  const [expanded, setExpanded] = React.useState<Set<string>>(new Set());

  const update = React.useCallback(<K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    setState(prev => ({ ...prev, [key]: value }));
  }, []);

  const sorted = React.useMemo<SearchableEntry[]>(
    () =>
      entries
        .map(entry => ({
          ...entry,
          searchIndex: [
            entry.title,
            entry.summary,
            entry.caveats?.join(' ') ?? '',
            entry.caniuseTitle ?? '',
            entry.id,
            CATEGORY_LABELS[entry.category],
          ]
            .join(' ')
            .toLowerCase(),
        }))
        .toSorted((a, b) => a.title.localeCompare(b.title)),
    [entries]
  );

  const filtered = React.useMemo(() => filterEntries(sorted, state), [sorted, state]);

  const toggleRow = React.useCallback((id: string) => {
    setExpanded(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  return (
    <Wrapper>
      <FilterBar>
        <SearchField>
          <Search size={16} aria-hidden />
          <SearchInput
            type="search"
            placeholder="Filter features (nesting, color, @container, …)"
            value={state.query}
            onChange={e => update('query', e.target.value)}
            aria-label="Filter CSS features"
          />
        </SearchField>

        <Selects>
          <Select
            value={state.category}
            onChange={e => update('category', e.target.value as Category | 'all')}
            aria-label="Filter by category"
          >
            <option value="all">All categories</option>
            {CATEGORY_KEYS.map(c => (
              <option key={c} value={c}>
                {CATEGORY_LABELS[c]}
              </option>
            ))}
          </Select>

          <Select
            value={state.platform}
            onChange={e => update('platform', e.target.value as FilterState['platform'])}
            aria-label="Filter by platform"
          >
            <option value="all">All features</option>
            <option value="native">Supported on Native</option>
            <option value="web">Web-only</option>
          </Select>
        </Selects>

        <ResultCount>
          {filtered.length} {filtered.length === 1 ? 'feature' : 'features'}
        </ResultCount>
      </FilterBar>

      <Legend aria-label="Support state legend">
        <LegendItem $status="yes">
          <Check size={14} aria-hidden />
          Supported
        </LegendItem>
        <LegendItem $status="partial">
          <Contrast size={14} aria-hidden />
          Partial
        </LegendItem>
        <LegendItem $status="pending">
          <HourglassEmpty size={14} aria-hidden />
          PR in flight
        </LegendItem>
        <LegendItem $status="no">
          <Close size={14} aria-hidden />
          Not supported
        </LegendItem>
      </Legend>

      {filtered.length === 0 ? (
        <Empty>
          <ContentPasteSearch size={20} aria-hidden /> No features match.
        </Empty>
      ) : (
        <TableShell>
          <Table role="table" aria-label="CSS feature support">
            <Thead>
              <HeaderRow role="row">
                <FeatureHeaderCell role="columnheader">Feature</FeatureHeaderCell>
                <HeaderCell role="columnheader" title="styled-components v6 native runtime">
                  v6
                </HeaderCell>
                <HeaderCell role="columnheader" aria-label="v7" title="styled-components v7 native runtime">
                  v7
                  <NewBadge href="/docs/v7" aria-label="What's new in v7">
                    new
                  </NewBadge>
                </HeaderCell>
                <HeaderCell role="columnheader" title="What stock React Native iOS supports without styled-components">
                  iOS
                </HeaderCell>
                <HeaderCell
                  role="columnheader"
                  title="What stock React Native Android supports without styled-components"
                >
                  Android
                </HeaderCell>
              </HeaderRow>
            </Thead>
            <Tbody>
              {filtered.map(entry => (
                <FeatureRow key={entry.id} entry={entry} expanded={expanded.has(entry.id)} onToggle={toggleRow} />
              ))}
            </Tbody>
          </Table>
        </TableShell>
      )}
    </Wrapper>
  );
}

const FeatureRow = React.memo(function FeatureRow({
  entry,
  expanded,
  onToggle,
}: {
  entry: MergedEntry;
  expanded: boolean;
  onToggle: (id: string) => void;
}) {
  const handleToggle = React.useCallback(() => onToggle(entry.id), [onToggle, entry.id]);
  const prUrls = entry.prUrls;
  const browserMins = entry.browserMins;
  const hasAnyPR = prUrls && Object.values(prUrls).some(Boolean);
  const hasAnyBrowserMin = browserMins && Object.values(browserMins).some(Boolean);

  return (
    <>
      <ClickableRow
        role="row"
        aria-expanded={expanded}
        aria-controls={`compat-detail-${entry.id}`}
        id={`compat-${entry.id}`}
        tabIndex={0}
        onClick={handleToggle}
        onKeyDown={e => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleToggle();
          }
        }}
      >
        <FeatureCell role="cell">
          <Chevron $expanded={expanded} aria-hidden>
            <ChevronRight size={16} />
          </Chevron>
          <FeatureTitleWrap>
            <FeatureTitle>{entry.title}</FeatureTitle>
            <FeatureCategory>{CATEGORY_LABELS[entry.category]}</FeatureCategory>
          </FeatureTitleWrap>
        </FeatureCell>
        <SupportTd status={entry.nativeV6} prUrl={prUrls?.v6} title={entry.title} />
        <SupportTd status={entry.nativeV7} prUrl={prUrls?.v7} title={entry.title} />
        <SupportTd status={entry.iosStock ?? 'no'} prUrl={prUrls?.ios} title={entry.title} />
        <SupportTd status={entry.androidStock ?? 'no'} prUrl={prUrls?.android} title={entry.title} />
      </ClickableRow>
      {expanded && (
        <DetailRow role="row">
          <DetailCell role="cell" id={`compat-detail-${entry.id}`}>
            <DetailBody>
              <DetailSummary>
                <Markdown options={MARKDOWN_OPTIONS}>{entry.summary}</Markdown>
              </DetailSummary>
              {hasAnyPR && (
                <PRLinkGroup aria-label="Work-in-progress PRs">
                  {PR_COLUMNS.map(({ key, label }) =>
                    prUrls?.[key] ? (
                      <DetailPRLink key={key} href={prUrls[key]} target="_blank" rel="noopener">
                        <HourglassEmpty size={12} aria-hidden /> {label} PR <OpenInNew size={11} aria-hidden />
                      </DetailPRLink>
                    ) : null
                  )}
                </PRLinkGroup>
              )}
              {entry.caveats && entry.caveats.length > 0 && (
                <DetailCaveats>
                  {entry.caveats.map((caveat, i) => (
                    <li key={i}>
                      <Markdown options={MARKDOWN_OPTIONS}>{caveat}</Markdown>
                    </li>
                  ))}
                </DetailCaveats>
              )}
              {hasAnyBrowserMin && (
                <BrowserStrip aria-label="Minimum browser version">
                  {BROWSER_COLUMNS.map(({ key, label }) =>
                    browserMins?.[key] ? (
                      <BrowserChip key={key}>
                        {label} {browserMins[key]}+
                      </BrowserChip>
                    ) : null
                  )}
                </BrowserStrip>
              )}
            </DetailBody>
          </DetailCell>
        </DetailRow>
      )}
    </>
  );
});

function StatusIcon({ status }: { status: Support }) {
  const label = SUPPORT_LABELS[status];
  switch (status) {
    case 'yes':
      return <Check size={16} aria-label={label} />;
    case 'partial':
      return <Contrast size={14} aria-label={label} />;
    case 'no':
      return <Close size={14} aria-label={label} />;
  }
}

function SupportTd({ status, prUrl, title }: { status: Support; prUrl?: string; title: string }) {
  if (prUrl && status === 'no') {
    return (
      <SupportCell role="cell" $status="pending">
        <PRLink
          href={prUrl}
          target="_blank"
          rel="noopener"
          onClick={e => e.stopPropagation()}
          aria-label={`${title}: work in progress (opens PR)`}
        >
          <HourglassEmpty size={14} aria-hidden />
        </PRLink>
      </SupportCell>
    );
  }
  return (
    <SupportCell role="cell" $status={status}>
      <StatusIcon status={status} />
    </SupportCell>
  );
}

function filterEntries(entries: SearchableEntry[], { query, category, platform }: FilterState): SearchableEntry[] {
  const q = query.trim().toLowerCase();
  return entries.filter(entry => {
    if (category !== 'all' && entry.category !== category) return false;

    const nativeAny = entry.nativeV6 !== 'no' || entry.nativeV7 !== 'no';
    if (platform === 'native' && !nativeAny) return false;
    if (platform === 'web' && nativeAny) return false;

    if (q.length === 0) return true;
    return entry.searchIndex.includes(q);
  });
}

// ─────────────────────────────────── Styles ───────────────────────────────────

const Wrapper = styled.div`
  margin: ${theme.space[6]} 0 ${theme.space[12]};
  font-family: ${font.sans};
  container-type: inline-size;
`;

const FilterBar = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto auto;
  gap: ${theme.space[3]};
  align-items: center;
  padding: ${theme.space[3]};
  background: ${theme.color.surface};
  border: 1px solid ${theme.color.border};
  border-radius: ${theme.radius.lg};
  margin-bottom: ${theme.space[5]};

  @container (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const SearchField = styled.label`
  display: flex;
  align-items: center;
  gap: ${theme.space[2]};
  padding: 0 ${theme.space[3]};
  background: ${theme.color.bg};
  border: 1px solid ${theme.color.border};
  border-radius: ${theme.radius.md};
  color: ${theme.color.textMuted};

  &:focus-within {
    border-color: ${theme.color.accent};
    color: ${theme.color.text};
  }
`;

const SearchInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  padding: ${theme.space[2]} 0;
  font: inherit;
  color: ${theme.color.text};
  min-width: 0;

  &::placeholder {
    color: ${theme.color.textMuted};
  }
`;

const Selects = styled.div`
  display: flex;
  gap: ${theme.space[2]};

  @container (max-width: 640px) {
    flex-wrap: wrap;
  }
`;

const Select = styled.select`
  font: inherit;
  appearance: none;
  -webkit-appearance: none;
  background-color: ${theme.color.bg};
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23888' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'/></svg>");
  background-position: right ${theme.space[3]} center;
  background-repeat: no-repeat;
  background-size: 12px;
  color: ${theme.color.text};
  border: 1px solid ${theme.color.border};
  border-radius: ${theme.radius.md};
  padding: ${theme.space[2]} ${theme.space[8]} ${theme.space[2]} ${theme.space[3]};
  cursor: pointer;

  &:hover {
    border-color: ${theme.color.borderStrong};
  }
`;

const ResultCount = styled.span`
  color: ${theme.color.textMuted};
  font-size: ${theme.text.sm};
  text-align: right;
  white-space: nowrap;

  @container (max-width: 640px) {
    text-align: left;
  }
`;

const Legend = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.space[2]};
  margin-bottom: ${theme.space[4]};
  font-size: ${theme.text.sm};
  color: ${theme.color.textMuted};
`;

const LegendItem = styled.span<{ $status: CellStatus }>`
  display: inline-flex;
  align-items: center;
  gap: ${theme.space[2]};
  padding: ${theme.space[1]} ${theme.space[3]};
  border-radius: ${theme.radius.full};
  border: 1px solid ${theme.color.border};
  ${p => statusStyle(p.$status)}
`;

const Empty = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.space[2]};
  padding: ${theme.space[8]};
  color: ${theme.color.textMuted};
  font-size: ${theme.text.sm};
  text-align: center;
  justify-content: center;
  border: 1px solid ${theme.color.border};
  border-radius: ${theme.radius.lg};
`;

const TableShell = styled.div`
  border: 1px solid ${theme.color.border};
  border-radius: ${theme.radius.lg};
  background: ${theme.color.bg};
`;

const Table = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) repeat(4, 84px);

  @container (max-width: 640px) {
    grid-template-columns: minmax(0, 1fr) repeat(4, 56px);
  }
`;

const Thead = styled.div`
  display: contents;
`;

const Tbody = styled.div`
  display: contents;
`;

const rowDisplay = css`
  display: contents;
`;

const HeaderRow = styled.div`
  ${rowDisplay}
`;

const HeaderCell = styled.div`
  position: sticky;
  top: ${navbarHeight}px;
  z-index: 1;
  background: ${theme.color.surface};
  font-size: ${theme.text.xs};
  font-weight: ${theme.fontWeight.semibold};
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: ${theme.color.textMuted};
  padding: ${theme.space[3]} ${theme.space[2]};
  border-bottom: 1px solid ${theme.color.border};
  text-align: center;
  white-space: nowrap;
`;

const FeatureHeaderCell = styled(HeaderCell)`
  text-align: left;
  padding-left: ${theme.space[4]};
`;

const NewBadge = styled.a`
  display: inline-block;
  margin-left: ${theme.space[2]};
  padding: 1px ${theme.space[2]};
  font-size: 0.65rem;
  font-weight: ${theme.fontWeight.medium};
  letter-spacing: 0.02em;
  text-transform: uppercase;
  text-decoration: none;
  border-radius: ${theme.radius.full};
  color: color-mix(in oklab, ${theme.palette[7]} 65%, ${theme.color.text});
  background: color-mix(
    in oklab,
    color-mix(in oklab, ${theme.palette[7]} 65%, ${theme.color.text}) 22%,
    ${theme.color.bg}
  );
  transition: filter ${theme.duration.fast};

  &:hover,
  &:focus-visible {
    filter: brightness(1.1);
    text-decoration: none;
  }
`;

const ClickableRow = styled.div`
  ${rowDisplay}

  & > * {
    cursor: zoom-in;
    background: ${theme.color.bg};
    transition: background ${theme.duration.fast} ${theme.ease.out};
  }

  &[aria-expanded='true'] > * {
    cursor: zoom-out;
  }

  &:hover > * {
    background: ${theme.color.surface};
  }

  &:focus-visible {
    outline: none;
  }

  &:focus-visible > * {
    background: ${theme.color.surface};
    box-shadow: inset 0 0 0 1px ${theme.color.accent};
  }
`;

const baseCell = css`
  padding: ${theme.space[2]} ${theme.space[2]};
  border-bottom: 1px solid ${theme.color.border};
  display: flex;
  align-items: center;
  min-height: ${theme.space[10]};

  ${Tbody} > *:last-child & {
    border-bottom: none;
  }
`;

const FeatureCell = styled.div`
  ${baseCell}
  padding-left: ${theme.space[3]};
  gap: ${theme.space[2]};
  min-width: 0;
`;

const Chevron = styled.span<{ $expanded?: boolean }>`
  display: inline-flex;
  flex-shrink: 0;
  color: ${theme.color.textMuted};
  transition: transform ${theme.duration.fast} ${theme.ease.out};
  transform: rotate(${p => (p.$expanded ? '90deg' : '0deg')});
`;

const FeatureTitleWrap = styled.span`
  display: flex;
  flex-direction: column;
  min-width: 0;
  gap: 1px;
`;

const FeatureTitle = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${theme.space[1]};
  font-weight: ${theme.fontWeight.medium};
  color: ${theme.color.text};
  font-size: ${theme.text.sm};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const FeatureCategory = styled.span`
  font-size: ${theme.text.xs};
  color: ${theme.color.textMuted};
  text-transform: uppercase;
  letter-spacing: 0.04em;
`;

type CellStatus = Support | 'pending';

const statusStyle = (status: CellStatus) => {
  switch (status) {
    case 'yes':
      return css`
        background: color-mix(in oklab, ${theme.palette[7]} 14%, ${theme.color.bg}) !important;
        color: color-mix(in oklab, ${theme.palette[7]} 65%, ${theme.color.text});
      `;
    case 'partial':
      return css`
        background: color-mix(in oklab, ${theme.palette[3]} 14%, ${theme.color.bg}) !important;
        color: color-mix(in oklab, ${theme.palette[3]} 65%, ${theme.color.text});
      `;
    case 'no':
      return css`
        background: color-mix(in oklab, ${theme.color.text} 6%, ${theme.color.bg}) !important;
        color: ${theme.color.textMuted};
      `;
    case 'pending':
      return css`
        background: color-mix(in oklab, ${theme.palette[11]} 14%, ${theme.color.bg}) !important;
        color: color-mix(in oklab, ${theme.palette[11]} 65%, ${theme.color.text});
      `;
  }
};

const SupportCell = styled.div<{ $status: CellStatus }>`
  ${baseCell}
  justify-content: center;
  ${p => statusStyle(p.$status)}
`;

const PRLink = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  cursor: pointer;
  color: inherit;
  text-decoration: none;
  border-radius: ${theme.radius.sm};

  &:hover {
    text-decoration: none;
  }

  &:focus-visible {
    outline: 2px solid ${theme.color.accent};
    outline-offset: 1px;
  }
`;

const DetailRow = styled.div`
  ${rowDisplay}
`;

const DetailCell = styled.div`
  grid-column: 1 / -1;
  padding: ${theme.space[4]} ${theme.space[5]};
  border-bottom: 1px solid ${theme.color.border};
  background: ${theme.color.surface};

  ${Tbody} > *:last-child & {
    border-bottom: none;
  }
`;

const DetailBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.space[3]};
  max-width: 70ch;
`;

const DetailSummary = styled.p`
  margin: 0;
  font-size: ${theme.text.sm};
  line-height: ${theme.leading.normal};
  color: ${theme.color.textSecondary};
`;

const DetailCaveats = styled.ul`
  margin: 0;
  padding-left: ${theme.space[5]};
  font-size: ${theme.text.sm};
  color: ${theme.color.textSecondary};
  display: flex;
  flex-direction: column;
  gap: ${theme.space[1]};

  & > li {
    line-height: ${theme.leading.normal};
  }
`;

const PRLinkGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.space[2]};
`;

const DetailPRLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: ${theme.space[1]};
  font-size: ${theme.text.xs};
  padding: ${theme.space[1]} ${theme.space[3]};
  background: color-mix(in oklab, ${theme.palette[11]} 18%, ${theme.color.bg});
  color: ${theme.palette[11]};
  border-radius: ${theme.radius.full};
  text-decoration: none;
  font-weight: ${theme.fontWeight.medium};

  &:hover {
    background: color-mix(in oklab, ${theme.palette[11]} 28%, ${theme.color.bg});
    text-decoration: none;
  }
`;

const BrowserStrip = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.space[2]};
`;

const BrowserChip = styled.span`
  font-size: ${theme.text.xs};
  padding: ${theme.space[1]} ${theme.space[2]};
  background: ${theme.color.bg};
  color: ${theme.color.textMuted};
  border: 1px solid ${theme.color.border};
  border-radius: ${theme.radius.full};
`;
